import { IUser } from './IUser';

export interface ISchedule{
    id: number,
    title: string,
    startDate: Date,
    startTime: Date,
    endDate : Date,
    endTime: Date,
    student: number,
    studentDetail?: IUser
}