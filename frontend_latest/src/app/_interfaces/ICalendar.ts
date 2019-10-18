import { IUser } from './IUser';

export interface ICalendar {
    id: number,
    title: string,
    description: string,
    teachers: IUser[],
    created_at: Date,
    updated_at: Date    
}