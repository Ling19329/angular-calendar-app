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
    private isEmptyCalendar:boolean = false;
    constructor(
        private backendService: BackendService, 
        private authenticationService: AuthenticationService,
        private dialog: MatDialog
        ) {}

    ngOnInit() {
        this.currentUser = this.authenticationService.currentUserValue;
        this.backendService.getCalendars(this.currentUser.id).subscribe((payload) => {
            this.calendars = payload;
            if(!this.calendars.length){
                this.isEmptyCalendar = true;
                this.currentCalendar = null;
            }
            else 
                this.currentCalendar = { ...this.currentCalendar, id:0};
                this.backendService.getSchedules(this.currentCalendar.id).subscribe((schedules) => {
                    console.log('schedules', schedules);
                    schedules.forEach((object, index) => {
                        var temp_array = Object.keys(object).map(function(key) {
                            return [object[key]];
                        });
                        let temp_student = <IStudent>temp_array[8][0];

                        var temp_obj = {
                            //add student id to title
                            "id": temp_array[0][0],
                            "title": temp_array[1][0] + ":"+ temp_student.firstname + ' ' + temp_student.lastname,
                            "start": this.custom_date_formation(temp_array[4][0]),
                            "end": this.custom_date_formation(temp_array[5][0]),
                            "student": temp_array[3][0],
                            "calendar_id":temp_array[2][0]
                        }
                        this.tempEvents[index] = temp_obj;
                    });
                    this.calendarEvents = this.tempEvents;
                })
        });

        
    }
    custom_date_formation(date: string) {
        if ( date.toString().split(' ') == undefined)
        return date;
            
        else
        return date.toString().split(' ')[0];
            
    }

    handleAddEvent(arg) {
        if(this.currentCalendar.id == 0){
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
        else{
            const selectDialogRef = this.dialog.open(HandleScheduleDlgComponent, {
                width: '350px',
                height: '550px',
                data: {
                    action: 'Add',
                    startDate: arg.startStr,
                    endDate: arg.endStr
                }
            });
    
            selectDialogRef.afterClosed().subscribe(result => {
                if (result.event == 'Add'){
                    
                    console.log('result', result);
                    this.backendService.createSchedule(
                        result.data.title,
                        result.data.startDate,
                        result.data.endDate,
                        result.data.student,
                        this.currentCalendar.id
                    ).subscribe(payload => {

                        var temp_array = Object.keys(payload).map(function(key) {
                            return [payload[key]];
                        });
                        let temp_student = <IStudent>temp_array[8][0];
                        console.log('temp_array', temp_array);
                        var temp_obj = {
                            //add student id to title
                            "title": temp_array[0][0] + ":"+ temp_student.firstname + ' ' + temp_student.lastname,
                            "start": this.custom_date_formation(temp_array[1][0]),
                            "end": this.custom_date_formation(temp_array[2][0])
                        }
                        this.calendarEvents = this.calendarEvents.concat(temp_obj);
                    });

                }
            });
        }
        
    }

    handleEditEvent(e){
        let temp_event = this.tempEvents.find(item => item.id == e.event.id)
        const selectDialogRef = this.dialog.open(HandleScheduleDlgComponent, {
            width: '350px',
            height: '550px',
            data: {
                action: 'Edit',
                id: temp_event.id,
                title: temp_event.title.split(':')[0],
                startDate: temp_event.start,
                endDate: temp_event.end,
                calendar_id: temp_event.calendar_id,
                student: temp_event.calendar_id
            }
        });

        selectDialogRef.afterClosed().subscribe(result => {
            if (result.event == 'Edit'){
                console.log('result', result);
                this.backendService.updateSchedule(
                    result.data.id,
                    result.data.title,
                    result.data.startDate,
                    result.data.endDate,
                    result.data.student,
                    result.data.id
                ).subscribe(payload => {

                    var temp_array = Object.keys(payload).map(function(key) {
                        return [payload[key]];
                    });
                    let temp_student = <IStudent>temp_array[8][0];
                    console.log('temp_array', temp_array);
                    var temp_obj = {
                        //add student id to title
                        "title": temp_array[0][0] + ":"+ temp_student.firstname + ' ' + temp_student.lastname,
                        "start": this.custom_date_formation(temp_array[1][0]),
                        "end": this.custom_date_formation(temp_array[2][0])
                    }
                    this.calendarEvents = this.calendarEvents.concat(temp_obj);
                });

            }

            else if (result.event == 'Delete'){
                console.log('result', result);
                this.backendService.deleteSchedule(
                    result.data.id,
                ).subscribe(payload => {
                    console.log('resultDataId', result.data.id);
                    console.log('lthisCalen', this.calendarEvents);

                    if (payload)
                        this.calendarEvents = this.calendarEvents.filter(item => item.id != result.data.id);
                });

            }
        });

        
    }

    // createSchedule(createdScheduleData: ISchedule){
    //     this.calendarEvents = this.calendarEvents.concat({
    //         title: createdScheduleData.title,
    //         start: createdScheduleData.startDate,
    //         end: createdScheduleData.endDate
    //     });
    // }
    
    onClickAddCalendar(action, obj){
        obj.action = action;
        
        const dialogRef = this.dialog.open(HandleCalendarDlgComponent, {
            width: '450px',
            disableClose: true,
            data: obj
          });
       
          dialogRef.afterClosed().subscribe(result => {
            if(result.event === 'Add'){
              this.backendService.createCalendar(
                  result.data.title,
                  result.data.description,
                  result.data.teachers && result.data.teachers.length!=0 ?result.data.teachers.map(item => item.id):[]
              ).subscribe(payload => {
                  console.log('payload', payload);
              })
            }
          });
    }

    onClickEditCalendar(action){
        let obj = { ...this.currentCalendar, action: action}
        
        const dialogRef = this.dialog.open(HandleCalendarDlgComponent, {
            width: '450px',
            disableClose: true,
            data: obj
          });
       
          dialogRef.afterClosed().subscribe(result => {
            if(result.event === 'Edit'){
              this.backendService.updateCalendar(
                  result.data.id,
                  result.data.title,
                  result.data.description,
                  result.data.teachers && result.data.teachers.length!=0 ?result.data.teachers.map(item => item.id):[]
              ).subscribe(payload => {
                  console.log('payload', payload);
              });
            }
          });
    }

    setCurrentCalendar(calendar_id){
        this.currentCalendar = this.calendars.filter(item => item.id == calendar_id)[0];
        this.backendService.getSchedules(this.currentCalendar.id).subscribe((schedules) => {
            schedules.forEach((object, index) => {
                var temp_array = Object.keys(object).map(function(key) {
                    return [object[key]];
                });
                let temp_student = <IStudent>temp_array[8][0];
                var temp_obj = {
                    //add student id to title
                    
                    "title": temp_array[1][0] + ":"+ temp_student.firstname + ' ' + temp_student.lastname,
                    "start": this.custom_date_formation(temp_array[4][0]),
                    "end": this.custom_date_formation(temp_array[5][0])
                }
                this.tempEvents[index] = temp_obj;
            });
            this.calendarEvents = this.tempEvents;
        })

    }

    
}
