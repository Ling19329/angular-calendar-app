import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BackendService } from '../../../_services/backend.service';
import { IStudent } from '../../../_interfaces/IStudent';
import { UtilityService } from '../../../_services/utility.service';

@Component({
    selector: 'app-add-students-dlg',
    templateUrl: './add-students-dlg.component.html',
    styleUrls: ['./add-students-dlg.component.scss']
})
export class AddStudentsDlgComponent implements OnInit {


    id: number;
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;

    createdStudent: IStudent;

    // tslint:disable-next-line: max-line-length
    constructor(public addStudentDlgRef: MatDialogRef<AddStudentsDlgComponent>, public backendService: BackendService, public utilityService: UtilityService) { }

    ngOnInit() {
        this.backendService.getStudents().subscribe((students) => {
            this.id = students.length + 1;
        });
    }

    onAdd() {
        // console.log(this.id);
        // console.log(this.firstname);
        // console.log(this.lastname);
        // console.log(this.email);

        // Save Data of the student created
        this.backendService.createStudent({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email
        }).subscribe((res) => {
            console.log(res);
        });

        this.createdStudent = {
            id: this.id,
            firstname : this.firstname,
            lastname : this.lastname,
            dob: new Date(this.birthdate),
            email: this. email,
            role: '',
            is_active: '',
            created_at: new Date(),
            updated_at: new Date()
        };
        this.utilityService.onAddStudentComponentBtnClick(this.createdStudent);
    }

    onCancel() {
        this.addStudentDlgRef.close();
    }
}
