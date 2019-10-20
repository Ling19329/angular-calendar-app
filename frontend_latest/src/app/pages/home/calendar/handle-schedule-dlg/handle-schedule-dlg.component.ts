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
    }

    onCancel() {
        this.dialogRef.close({event: 'Cancel'});
    }

    // onSave() {
    //     // Send data to Backend by Post Method...
    //     // data.title, data.startDate, data.startTime, data.endDate, data.endTime, createdStudentId
    //     // Send data to backend...
    //     this.backendService.createSchedule({ title: this.data.title, start: this.data.startDate, end: this.data.endDate }).subscribe(res => {
    //         console.log('Schedule save successed');
    //     });

    //     // Showing saved Event on Calendar.
    //     this.schedule = {
    //         id: 0,
    //         title: this.data.title,
    //         startDate: this.data.startDate,
    //         endDate: this.data.endDate,
    //         startTime: new Date(),
    //         endTime: new Date(),
    //         student: this.createdStudentName
    //     };
    //     this.utilityService.onSaveScheduleComponentBtnClick(this.schedule);
    // }

    doAction() {
        this.local_data.student = this.createdStudentId;
        this.dialogRef.close({ event: this.action, data: this.local_data });
    }

    onDelete() {
        this.local_data.student = this.createdStudentId;
        this.action = 'Delete';
        this.doAction();
    }

}
