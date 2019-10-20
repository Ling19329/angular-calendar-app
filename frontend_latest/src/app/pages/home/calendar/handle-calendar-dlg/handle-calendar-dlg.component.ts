import { Component, OnInit, Inject, Optional } from '@angular/core';
import { IStudent } from 'src/app/_interfaces/IStudent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISchedule } from 'src/app/_interfaces/ISchedule';
import { BackendService } from 'src/app/_services/backend.service';
import { UtilityService } from 'src/app/_services/utility.service';
import { IUser } from 'src/app/_interfaces/IUser';
import { ICalendar } from 'src/app/_interfaces/ICalendar';

@Component({
    selector: 'app-handle-calendar-dlg',
    templateUrl: './handle-calendar-dlg.component.html',
    styleUrls: ['./handle-calendar-dlg.component.scss']
})
export class HandleCalendarDlgComponent implements OnInit{
    action: string;
    local_data: any;
    teachers: IUser[];
    selectedTeachers: IUser[];
    isExpandedTeacherList: false;
    myjson:any=JSON;
    constructor(
        public dialogRef: MatDialogRef<HandleCalendarDlgComponent>,
        //@Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICalendar,
        public backendService: BackendService
        ) {
        console.log('data on calendar dialog', data);
        this.local_data = { ...data };
        this.selectedTeachers = this.local_data.users.map(item => item.id);
        console.log('selected teachers', this.selectedTeachers);
        this.action = this.local_data.action;
    }

    ngOnInit() {
        this.backendService.getTeachers().subscribe(teachers => {
            this.teachers = teachers;
        });
    }

    doAction() {
        this.local_data.teachers = this.selectedTeachers;
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

    onSelection(e, v){
        this.selectedTeachers = v.map(item => item.value);
    }
}
