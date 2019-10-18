import { Component, OnInit, Inject, Optional } from '@angular/core';
import { IStudent } from 'src/app/_interfaces/IStudent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISchedule } from 'src/app/_interfaces/ISchedule';
import { BackendService } from 'src/app/_services/backend.service';
import { UtilityService } from 'src/app/_services/utility.service';
import { IUser } from 'src/app/_interfaces/IUser';
import { ICalendar } from 'src/app/_interfaces/ICalendar';

@Component({
    selector: 'app-create-calendar-dlg',
    templateUrl: './create-calendar-dlg.component.html',
    styleUrls: ['./create-calendar-dlg.component.scss']
})
export class CreateCalendarDlgComponent implements OnInit{
    action: string;
    local_data: any;
    teachers: IUser[];
    isExpandedTeacherList: false;
    constructor(
        public dialogRef: MatDialogRef<CreateCalendarDlgComponent>,
        //@Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ICalendar,
        public backendService: BackendService
        ) {
        console.log(data);
        this.local_data = { ...data };
        this.action = this.local_data.action;
    }

    ngOnInit() {
        this.backendService.getTeachers().subscribe(teachers => {
            this.teachers = teachers;
        });
    }

    doAction() {
        this.dialogRef.close({ event: 'Delete', data: this.local_data });
    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
