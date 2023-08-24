import { Component } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees!:Employee[];
  counter:number = 0;
  constructor(private employeeService: EmployeeService){
    this.employeeService.getEmployees().subscribe((res)=>
    {
      this.employees=res.data.employees;
    });
  }
}
