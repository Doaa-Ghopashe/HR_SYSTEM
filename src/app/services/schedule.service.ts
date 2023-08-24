import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  constructor(private _httpClinet: HttpClient) { }

  getEmployeeSchedule(id: any): Observable<any> {
    return this._httpClinet.get(`http://localhost:5000/scheduler/${id}`)
  }

  addEmployeeSchedule(schedule: any): Observable<any> {
    return this._httpClinet.post(`http://localhost:5000/scheduler`, schedule)
  }

  updateEmployeeSchedule(id: any, newData: any): Observable<any> {
    return this._httpClinet.put(`http://localhost:5000/scheduler/${id}`, newData)
  }

}
