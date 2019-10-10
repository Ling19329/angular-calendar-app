import { Component, OnInit } from '@angular/core';
import { IPeriodicElement } from '../../../_interfaces/IPeriodicElement';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { IStudent } from '../../../_interfaces/IStudent';
import { BackendService } from '../../../_services/backend.service';
import { AddStudentsDlgComponent } from '../add-students-dlg/add-students-dlg.component';
import { UtilityService } from '../../../_services/utility.service';
@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'dob', 'email', 'role', 'in_active', 'action'];
    dataSource = new MatTableDataSource();
    constructor(private backendService : BackendService, private addStudentDlg: MatDialog, public utilityService: UtilityService) { }
    tempStudents: IStudent[] = [];
    ngOnInit() {
        this.backendService.getStudents().subscribe(students => {
            this.dataSource = new MatTableDataSource(students.map(item => {
                return {...item, edited: false, role: item.role.toString(), is_active: item.is_active.toString()}
            }));
            this.tempStudents = students.map(item => {
                return {...item, edited: false, role: item.role.toString(), is_active: item.is_active.toString()}
            });
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

    handleEditRow(data: IStudent){
        
        this.tempStudents.map(item => {
            if(item.id == data.id){
                console.log('same id', item.id);
                item['edited'] = true;
            }
        });
        this.dataSource = new MatTableDataSource(this.tempStudents);
    }

    handleSaveRow(data: IStudent){
        console.log('edit row: ', data);
        
        this.backendService.updateUserProfile({
            id: data.id,
            role: parseInt(data.role, 10),
            is_active: parseInt(data.is_active, 10)
        }).subscribe((user) => {
            this.tempStudents.map(item => {
                if(item.id == user.id){
                    item['edited'] = false;
                    item.role = user.role.toString();
                    item.is_active = user.is_active.toString();
                }
            });
        });
        this.dataSource = new MatTableDataSource(this.tempStudents);
    }

}
