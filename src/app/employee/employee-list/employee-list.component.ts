import { Component } from '@angular/core';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees!:Employee[];
  counter:number = 0;
  constructor(){
    this.employees=[
      {"id":1,"first_name":"Doaa","last_name":"Adel","email":"doaaadel@yahoo.com","role":"DevOps"},
      {"id":2,"first_name":"Sally","last_name":"Zahran","email":"sallyzahran@yahoo.com","role":"Financial Officer"},
      {"id":3,"first_name":"Sondos","last_name":"Ahmed","email":"sondosahmed@yahoo.com","role":"Accountant"},
      {"id":4,"first_name":"Aya","last_name":"Hamed","email":"ayahamed@yahoo.com","role":"Accountant"},
      {"id":5,"first_name":"Tabark","last_name":"Said","email":"tabarksaid@yahoo.com","role":"HR","password":"4528da"},
      {"id":6,"first_name":"Eman","last_name":"Elzahaby","email":"emanelzahby@yahoo.com","role":"HR","password":"5d645sdfs"},
    ]
  }
}
