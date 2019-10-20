import { Component, OnInit, Inject, Optional } from '@angular/core';
import { IStudent } from 'src/app/_interfaces/IStudent';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISchedule } from 'src/app/_interfaces/ISchedule';
import { BackendService } from 'src/app/_services/backend.service';
import { UtilityService } from 'src/app/_services/utility.service';
import { IUser } from 'src/app/_interfaces/IUser';
import { ICalendar } from 'src/app/_interfaces/ICalendar';

@Component({
    selector: 'app-alert-dlg',
    templateUrl: './alert-dlg.component.html',
    styleUrls: ['./alert-dlg.component.scss']
})
export class AlertDlgComponent implements OnInit{
    action: string;
    local_data: any;

    constructor(
        public dialogRef: MatDialogRef<AlertDlgComponent>,
        //@Optional() is used to prevent error if no data is passed
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        ) {
        console.log(data);
        this.local_data = { ...data };
        this.action = this.local_data.action;
    }

    ngOnInit() {

    }

    closeDialog() {
        this.dialogRef.close({ event: 'Cancel' });
    }

}
