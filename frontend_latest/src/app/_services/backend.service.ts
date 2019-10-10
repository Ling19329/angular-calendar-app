import { Injectable } from '@angular/core';
import { map, retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ISchedule } from '../_interfaces/ISchedule';
import { IStudent } from '../_interfaces/IStudent';


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

    getSchedules(): Observable<ISchedule[]> {
        return this.httpClient.get<ISchedule[]>(this.base_url + '/event');
    }
    getStudents(): Observable<IStudent[]> {
        return this.httpClient.get<IStudent[]>(this.base_url + '/user');
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
