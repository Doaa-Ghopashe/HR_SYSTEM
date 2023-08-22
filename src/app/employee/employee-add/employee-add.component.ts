import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employeeForm!: FormGroup;
  selectedRole: string = "HR";

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [this.selectedRole, Validators.required],
      password: ['']
    });

    this.employeeForm.get('role')?.valueChanges.subscribe((value) => {
      if (value !== this.selectedRole) {
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
    console.log(this.employeeForm);
  }
}
