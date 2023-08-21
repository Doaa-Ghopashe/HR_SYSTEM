import { Component } from '@angular/core';
import { Employee } from '../interfaces/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees!:Employee[];
  constructor(){
    this.employees=[
      {"first_name":"Doaa","last_name":"Adel","email":"doaaadel@yahoo.com","role":"CEO"},
      {"first_name":"Sally","last_name":"Zahran","email":"sallyzahran@yahoo.com","role":"Full_stack Engineer"},
      {"first_name":"Sondos","last_name":"Ahmed","email":"sondosahmed@yahoo.com","role":"Backend Developer"},
      {"first_name":"Aya","last_name":"Hamed","email":"ayahamed@yahoo.com","role":"Backend Developer"},
      {"first_name":"Tabark","last_name":"Said","email":"tabarksaid@yahoo.com","role":"HR","password":"4528da"},
      {"first_name":"Eman","last_name":"Elzahaby","email":"emanelzahby@yahoo.com","role":"HR","password":"5d645sdfs"},
    ]
  }
}
