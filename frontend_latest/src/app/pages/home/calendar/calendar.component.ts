import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material';
import { CreateSelectDlgComponent } from '../create-select-dlg/create-select-dlg.component';
import { BackendService } from '../../../_services/backend.service';
import { ISchedule } from '../../../_interfaces/ISchedule';
import { UtilityService } from '../../../_services/utility.service';
import { IUser } from 'src/app/_interfaces/IUser';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ICalendar } from 'src/app/_interfaces/ICalendar';
import { CreateCalendarDlgComponent } from '../create-calendar-dlg/create-calendar-dlg.component';
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
        private createSelectDialog: MatDialog, 
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
                this.currentCalendar = this.calendars[0];
        })
        
    }
    

    custom_date_formation(date: string) {
        return date.split(' ')[0];
    }

    handleSelect(arg) {
        const selectDialogRef = this.createSelectDialog.open(CreateSelectDlgComponent, {
            width: '350px',
            height: '550px',
            data: {
                startDate: arg.startStr,
                endDate: arg.endStr
            }
        });

        selectDialogRef.afterClosed().subscribe(result => {
            console.log('The Dialog was closed');
        });
    }

    // createScheduleTest(){
    //     alert("asdfasdf");
    // }
    createSchedule(createdScheduleData: ISchedule){
        this.calendarEvents = this.calendarEvents.concat({
            title: createdScheduleData.title,
            start: createdScheduleData.startDate,
            end: createdScheduleData.endDate
        });
    }
    
    onClickAddCalendar(action, obj){
        obj.action = action
        const dialogRef = this.dialog.open(CreateCalendarDlgComponent, {
            width: '450px',
            data: obj
          });
       
          dialogRef.afterClosed().subscribe(result => {
            if(result.event === 'Add'){
              
            }
          });
    }
}
