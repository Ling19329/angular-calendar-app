import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISchedule } from '../../../../_interfaces/ISchedule';
import { BackendService } from '../../../../_services/backend.service';
import { IStudent } from '../../../../_interfaces/IStudent';
import { UtilityService } from '../../../../_services/utility.service';
@Component({
    selector: 'app-handle-schedule-dlg',
    templateUrl: './handle-schedule-dlg.component.html',
    styleUrls: ['./handle-schedule-dlg.component.scss']
})

export class HandleScheduleDlgComponent implements OnInit {
    action: string;
    local_data: any;
    createdStudentId: number;
    students: IStudent[];
    schedule: ISchedule;
    constructor(public dialogRef: MatDialogRef<HandleScheduleDlgComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ISchedule,
        public backendService: BackendService,
        public utilityService: UtilityService) {
            this.local_data = { ...data };
            this.action = this.local_data.action;
        }

    ngOnInit() {
        this.backendService.getStudents().subscribe(students => {
            this.students = students;
        });
        if (this.data.student)
        this.createdStudentId = this.data.student;
        console.log('data on the dialog', this.data);
    }

    onCancel() {
        this.dialogRef.close({event: 'Cancel'});
    }

    doAction() {
        this.local_data.startDate = new Date(this.local_data.startDate).toISOString().slice(0,10);
        this.local_data.endDate = new Date(this.local_data.endDate).toISOString().slice(0,10);
        console.log('local_data', this.local_data);

        if (this.createdStudentId)
            this.local_data.student = this.createdStudentId;
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    onDelete() {
        this.local_data.student = this.createdStudentId;
        this.action = 'Delete';
        this.doAction();
    }

}
