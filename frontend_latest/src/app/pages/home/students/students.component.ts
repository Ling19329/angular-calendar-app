import { Component, OnInit } from '@angular/core';
import { IPeriodicElement } from '../../../_interfaces/IPeriodicElement';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { IStudent } from '../../../_interfaces/IStudent';
import { BackendService } from '../../../_services/backend.service';
import { AddStudentsDlgComponent } from '../add-students-dlg/add-students-dlg.component';
import { UtilityService } from '../../../_services/utility.service';
const ELEMENT_DATA: IPeriodicElement[] = [
    { id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { id: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { id: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'dob', 'email', 'role', 'in_active'];
    dataSource = new MatTableDataSource();
    constructor(private backendService : BackendService, private addStudentDlg: MatDialog, public utilityService: UtilityService) { }
    tempStudents: IStudent[] = [];
    ngOnInit() {
        this.backendService.getStudents().subscribe(students => {
            this.dataSource = new MatTableDataSource(students);
            this.tempStudents = students;
        });

        if(this.utilityService.subsVar == undefined){
            this.utilityService.subsVar = this.utilityService.invokesaveStudent.subscribe((createdStudentData: IStudent)=>{
                this.addTableRow(createdStudentData);
            });
        }
    }

    id: number;

    editCourse() {
        const selectDialogRef = this.addStudentDlg.open(AddStudentsDlgComponent, {
            width: '350px',
            height: '550px'
        });

        selectDialogRef.afterClosed().subscribe(result => {
            console.log("The Dialog was closed");
        });
    }

    addTableRow(data: IStudent){
        this.tempStudents.push(data);
        this.dataSource = new MatTableDataSource(this.tempStudents);
    }

}
