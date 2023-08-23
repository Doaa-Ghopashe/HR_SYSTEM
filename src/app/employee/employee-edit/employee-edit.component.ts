import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employees!:Employee[];
  editForm!:FormGroup
  employee_id!:number;
  employeeData!:Employee;
 
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
    this.employees=[
      {"id":1,"first_name":"Doaa","last_name":"Adel","email":"doaaadel@yahoo.com","role":"DevOps"},
      {"id":2,"first_name":"Sally","last_name":"Zahran","email":"sallyzahran@yahoo.com","role":"Financial Officer"},
      {"id":3,"first_name":"Sondos","last_name":"Ahmed","email":"sondosahmed@yahoo.com","role":"Accountant"},
      {"id":4,"first_name":"Aya","last_name":"Hamed","email":"ayahamed@yahoo.com","role":"Accountant"},
      {"id":5,"first_name":"Tabark","last_name":"Said","email":"tabarksaid@yahoo.com","role":"HR","password":"4528da"},
      {"id":6,"first_name":"Eman","last_name":"Elzahaby","email":"emanelzahby@yahoo.com","role":"HR","password":"5d645sdfs"},
    ]
    // Initialize the form group and form fields
    this.editForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }
  
  ngOnInit(){
    this.employee_id=this.route.snapshot.params["id"];
    this.employeeData = this.employees.filter((employee)=>{
      return employee.id == this.employee_id;
    })[0];
    
    this.editForm.patchValue({
      firstName: this.employeeData .first_name,
      lastName: this.employeeData .last_name,
      email: this.employeeData .email,
      role: this.employeeData .role
    });

  }
}
