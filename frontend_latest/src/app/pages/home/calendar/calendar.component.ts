import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material';
import { BackendService } from '../../../_services/backend.service';
import { ISchedule } from '../../../_interfaces/ISchedule';
import { UtilityService } from '../../../_services/utility.service';
import { IUser } from 'src/app/_interfaces/IUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ICalendar } from 'src/app/_interfaces/ICalendar';
import { HandleCalendarDlgComponent } from './handle-calendar-dlg/handle-calendar-dlg.component';
import { HandleScheduleDlgComponent } from './handle-schedule-dlg/handle-schedule-dlg.component';
import { isNgTemplate } from '@angular/compiler';
import { AlertDlgComponent } from 'src/app/components/alert-dlg/alert-dlg.component';
import { IStudent } from 'src/app/_interfaces/IStudent';
@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

    // full calendar Options...
    calendarPlugins = [interactionPlugin, dayGridPlugin];
    calendarDefaultView = 'dayGridMonth';
    public calendarEvents = [];
    public tempEvents = [];

    private createdSchedule: ISchedule;
    private calendars: ICalendar[];
    private currentUser: IUser;
    private currentCalendar: ICalendar;
    private isEmptyCalendar: boolean = false;
    constructor(
        private backendService: BackendService,
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.backendService.getCalendars(this.currentUser.id).subscribe((payload) => {
            console.log('payload for calendars', payload);
            this.calendars = payload;
            if (!this.calendars.length) {
                this.isEmptyCalendar = true;
                this.currentCalendar = null;
            }
            else
                this.currentCalendar = { ...this.currentCalendar, id: 0 };
            this.backendService.getSchedules(this.currentCalendar.id).subscribe((schedules) => {
                schedules.forEach((object, index) => {
                    var temp_array = Object.keys(object).map(function (key) {
                        return [object[key]];
                    });
                    let temp_student = <IStudent>temp_array[8][0];

                    var temp_obj = {
                        //add student id to title
                        "id": temp_array[0][0],
                        "title": temp_array[1][0] + ":" + temp_student.firstname + ' ' + temp_student.lastname,
                        "start": this.custom_date_formation(temp_array[4][0]),
                        "end": this.custom_date_formation(temp_array[5][0]),
                        "student": temp_array[3][0],
                        "calendar_id": temp_array[2][0]
                    }
                    this.tempEvents[index] = temp_obj;

                });
                this.calendarEvents = this.tempEvents;
                this.tempEvents = [];
            })
        });


    }
    custom_date_formation(date: string) {
        if (date.toString().split(' ') == undefined)
            return date;

        else
            return date.toString().split(' ')[0];

    }

    handleAddEvent(arg) {
        if (this.currentCalendar.id == 0) {
            const alertDialogRef = this.dialog.open(AlertDlgComponent, {
                width: '350px',
                data: {
                    action: 'Error',
                    message: 'Calendar should be selected to add event'
                }
            });

            alertDialogRef.afterClosed().subscribe(result => {
                console.log('The Dialog was closed', result);
            });
        }
        else {
            const selectDialogRef = this.dialog.open(HandleScheduleDlgComponent, {
                width: '350px',
                height: '550px',
                disableClose: true,
                data: {
                    action: 'Add',
                    startDate: arg.startStr,
                    endDate: arg.endStr
                }
            });

            selectDialogRef.afterClosed().subscribe(result => {
                if (result.event == 'Add') {
                    this.backendService.createSchedule(
                        result.data.title,
                        result.data.startDate,
                        result.data.endDate,
                        result.data.student,
                        this.currentCalendar.id
                    ).subscribe(payload => {

                        var temp_array = Object.keys(payload).map(function (key) {
                            return [payload[key]];
                        });
                        let temp_student = <IStudent>temp_array[8][0];
                        var temp_obj = {
                            //add student id to title
                            "title": temp_array[0][0] + ":" + temp_student.firstname + ' ' + temp_student.lastname,
                            "start": this.custom_date_formation(temp_array[1][0]),
                            "end": this.custom_date_formation(temp_array[2][0]),
                            "student": temp_student.id,
                            "calendar_id": temp_array[4][0],
                            "id": temp_array[7][0],
                        }

                        this.calendarEvents = this.calendarEvents.concat(temp_obj);
                        console.log('calendar after added', this.calendarEvents);
                    });

                }
            });
        }
    }

    handleEditEvent(e) {
        let temp_event = this.calendarEvents.find(item => item.id == e.event.id);
        const selectDialogRef = this.dialog.open(HandleScheduleDlgComponent, {
            width: '350px',
            height: '550px',
            disableClose: true,
            data: {
                action: 'Edit',
                id: temp_event.id,
                title: temp_event.title.split(':')[0],
                startDate: temp_event.start,
                endDate: temp_event.end,
                calendar_id: temp_event.calendar_id,
                student: temp_event.student
            }
        });

        selectDialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Edit') {
                console.log('result', result);
                this.backendService.updateSchedule(
                    result.data.id,
                    result.data.title,
                    result.data.startDate,
                    result.data.endDate,
                    result.data.student,
                    result.data.calendar_id
                ).subscribe(payload => {

                    var temp_obj = {
                        "id": payload.id,
                        "calendar_id": payload.calendar_id,
                        "title": payload.title + ":" + payload.user.firstname + ' ' + payload.user.lastname,
                        "start": this.custom_date_formation(payload.start),
                        "end": this.custom_date_formation(payload.end),
                        "student": payload.user_id
                    }
                    this.calendarEvents = this.calendarEvents.map(item => item.id == temp_obj.id ? temp_obj : item);
                    console.log('calendar after edit', this.calendarEvents);
                });

            }

            else if (result.event == 'Delete') {
                console.log('result', result);
                this.backendService.deleteSchedule(
                    result.data.id,
                ).subscribe(payload => {
                    if (payload === true)
                        this.calendarEvents = this.calendarEvents.filter(item => item.id != result.data.id);
                    console.log('calendar after delete', this.calendarEvents);
                });
            }
        });


    }

    onClickAddCalendar(action, obj) {
        obj.action = action;

        const dialogRef = this.dialog.open(HandleCalendarDlgComponent, {
            width: '450px',
            disableClose: true,
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Add') {
                this.backendService.createCalendar(
                    result.data.title,
                    result.data.description,
                    result.data.teachers && result.data.teachers.length != 0 ? result.data.teachers.map(item => item.id) : []
                ).subscribe(payload => {
                    console.log('payload', payload);
                })
            }
        });
    }

    onClickEditCalendar(action) {
        console.log('current Calendar', this.currentCalendar);
        if (this.currentCalendar.id == 0) {
            const alertDialogRef = this.dialog.open(AlertDlgComponent, {
                width: '350px',
                data: {
                    action: 'Error',
                    message: 'At least one calendar should be selected to edit'
                }
            });

            alertDialogRef.afterClosed().subscribe(result => {
                console.log('The Dialog was closed', result);
            });

            return;
        }
        let obj = { ...this.currentCalendar, action: action }

        const dialogRef = this.dialog.open(HandleCalendarDlgComponent, {
            width: '450px',
            disableClose: true,
            data: obj
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result.event === 'Edit') {
                this.backendService.updateCalendar(
                    result.data.id,
                    result.data.title,
                    result.data.description,
                    result.data.teachers && result.data.teachers.length != 0 ? result.data.teachers : []
                ).subscribe(payload => {
                    console.log('payload', payload);
                    this.calendars = this.calendars.map(item => item.id == payload.id?payload:item);
                    this.currentCalendar = payload;
                    console.log(this.currentCalendar)
                });
            }
        });
    }

    setCurrentCalendar(calendar_id) {

        this.currentCalendar = this.calendars.find(item => item.id == calendar_id);
        console.log('current calendar', this.currentCalendar);
        this.backendService.getSchedules(this.currentCalendar.id).subscribe((schedules) => {
            schedules.forEach((object, index) => {
                var temp_array = Object.keys(object).map(function (key) {
                    return [object[key]];
                });
                let temp_student = <IStudent>temp_array[8][0];
                var temp_obj = {
                    //add student id to title
                    "id": temp_array[0][0],
                    "title": temp_array[1][0] + ":" + temp_student.firstname + ' ' + temp_student.lastname,
                    "start": this.custom_date_formation(temp_array[4][0]),
                    "end": this.custom_date_formation(temp_array[5][0]),
                    "student": temp_array[3][0],
                    "calendar_id": temp_array[2][0]
                }
                this.tempEvents[index] = temp_obj;
            });

            this.calendarEvents = this.tempEvents;
            this.tempEvents = [];

            console.log('calendar after select calendar', this.calendarEvents)
        })
    }
}
