import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _httpClinet: HttpClient) {}

  getEmployees(): Observable<any> {
    return this._httpClinet.get('http://localhost:5000/employees')
  }

  addEmployee(employeeData: any): Observable<any> {

    return this._httpClinet.post(`http://localhost:5000/employees`, employeeData)
  }

  addUser(employeeData:any):Observable <any>{
    return this._httpClinet.post(`http://localhost:5000/user`, employeeData)
  }

  updateEmployee(id: any, newData: any): Observable<any> {
    return this._httpClinet.put(`http://localhost:5000/employees/${id}`, newData)
  }

  getEmployeeData(_id: string): any {
    return this._httpClinet.get(`http://localhost:5000/employees/${_id}`);
  }

}
