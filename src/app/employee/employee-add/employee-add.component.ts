import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  addEmployeeForm!: FormGroup;
  selectedRole!: string;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.addEmployeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit() {
    this.addEmployeeForm.get('role')?.valueChanges.subscribe((value) => {
      if (value !== "HR") {
        this.addEmployeeForm.get('password')?.clearValidators();
      } else {
        this.addEmployeeForm.get('password')?.setValidators([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          Validators.maxLength(12)
        ]);
      }
      this.addEmployeeForm.get('password')?.updateValueAndValidity();
    });
  }

  addEmployee() {
    const employeeData = {
      firstname: this.addEmployeeForm.get('firstName')?.value,
      lastname: this.addEmployeeForm.get('lastName')?.value,
      email: this.addEmployeeForm.get('email')?.value,
      role: this.addEmployeeForm.get('role')?.value,
      password: this.addEmployeeForm.get('password')?.value
    };

    this.employeeService.addEmployee(employeeData).subscribe(
      {
        next: res => {
          Swal.fire(
            {
              icon: "success",
              title: "employee add successfuly",
              showConfirmButton: false,
            })
          location.replace("/employee");
        },
        error: err => {
          Swal.fire({
            icon: "error",
            title: "There is an error",
            showConfirmButton: false
          });
        },
        complete: () => {
        }
      })
  }

  changeRole(e: any) {
    this.selectedRole = (e.target as HTMLInputElement)?.value;
  }
}
