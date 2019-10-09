import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material';
import { CreateSelectDlgComponent } from '../create-select-dlg/create-select-dlg.component';
import { BackendService } from '../../../_services/backend.service';
import { ISchedule } from '../../../_interfaces/ISchedule';
import { UtilityService } from '../../../_services/utility.service';
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

    createdSchedule: ISchedule;


    constructor(private createSelectDialog: MatDialog, private backendService: BackendService, private utilityService: UtilityService) { }

    ngOnInit() {
        this.backendService.getSchedules().subscribe((schedules) => {
            console.log(schedules);
            schedules.forEach((object, index) => {
                // Convert object to array

                var temp_array = Object.keys(object).map(function(key) {
                    return [object[key]];
                });
                var temp_obj = {
                    "title": temp_array[1][0],
                    "start": this.custom_date_formation(temp_array[2][0]),
                    "end": this.custom_date_formation(temp_array[3][0])
                }
                this.tempEvents[index] = temp_obj;
            });
            this.calendarEvents = this.tempEvents;
        })

        if(this.utilityService.subsVar === undefined) {
            this.utilityService.subsVar = this.utilityService.invokesaveSchedule_Calendar.subscribe((createdScheduleData: ISchedule)=>{
                this.createSchedule(createdScheduleData);
            });
        }
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
}
