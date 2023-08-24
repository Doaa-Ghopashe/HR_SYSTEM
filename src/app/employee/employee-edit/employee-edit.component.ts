import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent {
  employees!: Employee[];
  editForm!: FormGroup
  employee_id!: string;
  employeeData!: Employee;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder,private employeeService:EmployeeService) {
    // Initialize the form group and form fields
    this.editForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.employee_id = this.route.snapshot.params["id"];

    this.employeeService.getEmployeeData(this.employee_id).subscribe((res:any)=>{
      this.employeeData = res.data.employeeData;

      // Move the code depending on employeeData here
      this.editForm.patchValue({
        firstname: this.employeeData.firstname,
        lastname: this.employeeData.lastname,
        email: this.employeeData.email,
        role: this.employeeData.role
      });
    });

  }

  update() {
    this.employeeService.updateEmployee(this.employeeData?._id, this.editForm.value).subscribe(
      {
        next: res => {
          Swal.fire({
            icon: "success",
            title:"Employee Updated Successfully",
            showConfirmButton: false,
          })
          location.replace("/employee");
        },
        error: err => alert(`${err.error.status} Failed to update`),
        complete: () => {

        }
      })
  }
}
