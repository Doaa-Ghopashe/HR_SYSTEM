import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleService } from 'src/app/services/schedule.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-attendance-schedule',
  templateUrl: './attendance-schedule.component.html',
  styleUrls: ['./attendance-schedule.component.css']
})
export class AttendanceScheduleComponent {
  employeeFirstName!: string;
  currentDate: string;
  selectedDate: string;
  Schedule: Schedule[][] = [];
  dailySchedule: Schedule[] = [];
  employee_id!: string;
  scheduleData: any[] = [];
  employeeData!: Employee;
  name_abr!: string;
  officialVacations: Date[] = [
    new Date('2023-8-25'),
    new Date('2023-8-31'),
    new Date('2024-01-01'),
    new Date('2023-9-10')
  ];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService, private scheduleService: ScheduleService) {
    this.currentDate = new Date().toISOString().substring(0, 7);
    this.selectedDate = this.currentDate;
    
  }

  ngOnInit() {
    this.employee_id = this.route.snapshot.params["id"];

    this.employeeService.getEmployeeData(this.employee_id).subscribe((res: any) => {
      this.employeeData = res.data.employeeData;
      this.name_abr = this.employeeData.firstname[0] + this.employeeData.lastname[0];
      this.employeeFirstName = this.employeeData.firstname;
    });

    this.scheduleService.getEmployeeSchedule(this.employee_id).subscribe((res)=>{
      this.scheduleData = res.data.userSchedule; 
      console.log(res)
      this.generateSchedule();
    })

   
  }

  isCurrentDate(day: { day: number, dayName: string, isVacation: boolean }): boolean {
    const currentDate = new Date();
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);

    return dayDate.toDateString() === currentDate.toDateString();
  }



  generateSchedule(): void {
    const [year, month] = this.selectedDate.split('-').map(Number);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    let currentDay = startDate;

    this.Schedule = [];

    while (currentDay <= endDate) {
      const day: number = currentDay.getDate();
      const dayName: string = this.getDayName(currentDay.getDay());
      const isVacation: boolean = this.isOfficialVacation(currentDay, this.officialVacations);

      if(this.scheduleData.length > 0){
        let date =(month < 10 ? "0" : "") + month + '-' + (day < 10 ? "0" : "") + day + '-' + year;
        this.scheduleData.filter((val:any,index:any) => {
          if(val.date == date){
            this.dailySchedule.push({
              day,
              dayName,
              isVacation,
              status: val.status,
              actualstarttime: val.actualstarttime,
              year,
              month,
              actualendtime: val.actualendtime,
              shiftstarttime: '08:00',
              shiftendtime: '16:00',
              extratimes: val.extratimes
            });
          }
          return 0;
        })
      }

      this.dailySchedule.push({
        day,
        dayName,
        isVacation,
        status: '',
        actualstarttime: '',
        year,
        month,
        actualendtime: '',
        shiftstarttime: '08:00',
        shiftendtime: '16:00',
        extratimes: 0
      });

      if (currentDay.getDay() === 6 || day === endDate.getDate()) {
        this.Schedule.push(this.dailySchedule);
        this.dailySchedule = []
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

  }

  isOfficialVacation(date: Date, officialVacations: Date[]): boolean {
    const dateString = date.toISOString().split('T')[0]; // Convert date to string in YYYY-MM-DD format

    return officialVacations.some(vacation => vacation.toISOString().split('T')[0] === dateString);
  }

  statuschange(e: any, weekNo: number, dayNo: number) {
    e.target.classList = e?.target.value;
    const selectedRow = this.Schedule.flat()[weekNo];

    if (selectedRow.status === "present") {
      selectedRow.actualstarttime = selectedRow.shiftstarttime;
    } else {
      selectedRow.actualstarttime = ""; // Clear the actual start time for other statuses
    }

    let data = { ...this.Schedule[weekNo][dayNo], "employee_id": this.employee_id };

    this.scheduleService.addEmployeeSchedule(data).subscribe(
      {
        next: res => {
          Swal.fire(
            {
              icon: "success",
              title: "Attendance Done",
              showConfirmButton: false,
            })
        },
        error: err => {
          Swal.fire({
            icon: "error",
            title: "There is an error",
            showConfirmButton: false
          });
        },
      })
  }

  getDayName(dayIndex: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
  }
}
