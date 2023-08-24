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
  employeeForm!: FormGroup;
  selectedRole!: string;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['']
    });
  }

  ngOnInit() {
    this.employeeForm.get('role')?.valueChanges.subscribe((value) => {
      if (value !== "HR") {
        this.employeeForm.get('password')?.clearValidators();
      } else {
        this.employeeForm.get('password')?.setValidators([
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
          Validators.maxLength(12)
        ]);
      }
      this.employeeForm.get('password')?.updateValueAndValidity();
    });
  }

  addEmployee() {
    const employeeData = {
      firstname: this.employeeForm.get('firstName')?.value,
      lastname: this.employeeForm.get('lastName')?.value,
      email: this.employeeForm.get('email')?.value,
      role: this.employeeForm.get('role')?.value,
      password: this.employeeForm.get('password')?.value
    };

    this.employeeService.add(employeeData).subscribe(
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
