import { Component, OnInit } from '@angular/core';
import { IPeriodicElement } from '../../../_interfaces/IPeriodicElement';
import { MatDialogConfig, MatDialog, MatTableDataSource } from '@angular/material';
import { IUser } from '../../../_interfaces/IUser';
import { BackendService } from '../../../_services/backend.service';
import { AddStudentsDlgComponent } from '../add-students-dlg/add-students-dlg.component';
import { UtilityService } from '../../../_services/utility.service';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['id', 'name', 'dob', 'email', 'role', 'in_active', 'action'];
    dataSource = new MatTableDataSource();
    constructor(private backendService : BackendService, private addStudentDlg: MatDialog, public utilityService: UtilityService) { }
    tempUsers: IUser[] = [];
    ngOnInit() {
        this.backendService.getUsers().subscribe(users => {
            this.dataSource = new MatTableDataSource(users.map(item => {
                return {...item, edited: false, role: item.role.toString(), is_active: item.is_active.toString()}
            }));
            this.tempUsers = users.map(item => {
                return {...item, edited: false, role: item.role.toString(), is_active: item.is_active.toString()}
            });
        });

        if(this.utilityService.subsVar == undefined){
            this.utilityService.subsVar = this.utilityService.invokesaveStudent.subscribe((createdStudentData: IUser)=>{
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

    addTableRow(data: IUser){
        this.tempUsers.push(data);
        this.dataSource = new MatTableDataSource(this.tempUsers);
    }

    handleEditRow(data: IUser){
        
        this.tempUsers.map(item => {
            if(item.id == data.id){
                console.log('same id', item.id);
                item['edited'] = true;
            }
        });
        this.dataSource = new MatTableDataSource(this.tempUsers);
    }

    handleSaveRow(data: IUser){
        console.log('edit row: ', data);
        
        this.backendService.updateUserProfile({
            id: data.id,
            role: parseInt(data.role, 10),
            is_active: parseInt(data.is_active, 10)
        }).subscribe((user) => {
            this.tempUsers.map(item => {
                if(item.id == user.id){
                    item['edited'] = false;
                    item.role = user.role.toString();
                    item.is_active = user.is_active.toString();
                }
            });
        });
        this.dataSource = new MatTableDataSource(this.tempUsers);
    }

}
