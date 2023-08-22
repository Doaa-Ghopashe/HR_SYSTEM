import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AttendanceScheduleComponent } from './attendance-schedule/attendance-schedule.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeeListComponent,
  },
  {
    path: 'add',
    component:EmployeeAddComponent
  },
  {
    path:'edit/:id',
    component:EmployeeEditComponent
  },
  {
    path:'attendance/:id',
    component:AttendanceScheduleComponent
  }
];

@NgModule({
  declarations: [
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    AttendanceScheduleComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    EmployeeAddComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    AttendanceScheduleComponent
  ]
})
export class EmployeeModule { }
