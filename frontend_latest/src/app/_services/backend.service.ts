import { Injectable } from '@angular/core';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ISchedule } from '../_interfaces/ISchedule';
import { IStudent } from '../_interfaces/IStudent';
import { ICalendar } from '../_interfaces/ICalendar';
import { IUser } from '../_interfaces/IUser';


@Injectable({
    providedIn: 'root'
})

export class BackendService {
    students: IStudent[];
    //base_url: string = "http://backend.meta-dot.de/api";
    base_url: string = "http://localhost:8000/api";
    constructor(private httpClient: HttpClient) {
    }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getCalendars(user_id: number): Observable<ICalendar[]> {
        console.log('user_id', user_id);
        return this.httpClient.post<ICalendar[]>(this.base_url + '/calendar-all',
        {
            user_id: user_id
        });
    }

    getCalendar(id:number, user_id: number): Observable<ICalendar[]> {
        return this.httpClient.post<ICalendar[]>(this.base_url + '/calendar', 
        {
            id: id,
            user_id: user_id
        });
    }

    getSchedules(): Observable<ISchedule[]> {
        return this.httpClient.get<ISchedule[]>(this.base_url + '/event');
    }

    getUsers(): Observable<IUser[]>{
        return this.httpClient.get<IUser[]>(this.base_url+'/user');
    }

    getStudents(): Observable<IStudent[]> {
        return this.httpClient.get<IStudent[]>(this.base_url + '/user/students');
    }

    getTeachers():Observable<IUser[]>{
        return this.httpClient.get<IUser[]>(this.base_url + '/user/teachers');
    }

    createSchedule(data): Observable<any> {
        return this.httpClient.post<any>(this.base_url + '/event', JSON.stringify(data),
            this.httpOptions).pipe(retry(1), catchError(this.errorHandl)
            );
    }

    createStudent(data): Observable<any> {
        return this.httpClient.post<any>(this.base_url + '/student', JSON.stringify(data),
            this.httpOptions).pipe(retry(1), catchError(this.errorHandl)
            );
    }

    updateUserProfile(data):Observable<any>{
        return this.httpClient.put<any>(this.base_url + '/user/' + data.id, JSON.stringify(data),
        this.httpOptions).pipe(retry(1), catchError(this.errorHandl))
    }

    errorHandl(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
