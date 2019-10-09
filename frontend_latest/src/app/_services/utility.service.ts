import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ISchedule } from '../_interfaces/ISchedule';
import { IStudent } from '../_interfaces/IStudent';

@Injectable({
    providedIn: 'root'
})

export class UtilityService{

    createdScheduleData: ISchedule;
    createdStudentData: IStudent;
    invokesaveSchedule_Calendar = new EventEmitter();
    invokesaveStudent = new EventEmitter;
    subsVar: Subscription;
    constructor(){}

    onSaveScheduleComponentBtnClick(createdScheduleData : ISchedule){
        this.invokesaveSchedule_Calendar.emit(createdScheduleData);
    }

    onAddStudentComponentBtnClick(createdStudentData: IStudent){
        this.invokesaveStudent.emit(createdStudentData);
    }
}