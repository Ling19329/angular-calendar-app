import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ISchedule } from '../../../_interfaces/ISchedule';
import { BackendService } from '../../../_services/backend.service';
import { IStudent } from '../../../_interfaces/IStudent';
import { UtilityService } from '../../../_services/utility.service';
@Component({
    selector: 'app-create-select-dlg',
    templateUrl: './create-select-dlg.component.html',
    styleUrls: ['./create-select-dlg.component.scss']
})

export class CreateSelectDlgComponent implements OnInit {

    createdStudentName: string;
    students: IStudent[];
    schedule: ISchedule;
    constructor(public creatSelectDlgRef: MatDialogRef<CreateSelectDlgComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ISchedule,
        public backendService: BackendService,
        public utilityService: UtilityService) { }

    ngOnInit() {
        this.backendService.getStudents().subscribe(students => {
            this.students = students;
        });

    }

    onCancel() {
        this.creatSelectDlgRef.close();
    }

    onSave() {
        // Send data to Backend by Post Method...
        // data.title, data.startDate, data.startTime, data.endDate, data.endTime, createdStudentId
        // Send data to backend...
        this.backendService.createSchedule({ title: this.data.title, start: this.data.startDate, end: this.data.endDate }).subscribe(res => {
            console.log('Schedule save successed');
        });

        // Showing saved Event on Calendar.
        this.schedule = {
            id: 0,
            title: this.data.title,
            startDate: this.data.startDate,
            endDate: this.data.endDate,
            startTime: new Date(),
            endTime: new Date(),
            student: this.createdStudentName
        };
        this.utilityService.onSaveScheduleComponentBtnClick(this.schedule);
    }

}
