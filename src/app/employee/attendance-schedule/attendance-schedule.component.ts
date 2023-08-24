import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
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
  schedule: Schedule[][] = [];
  newDay: Schedule[] = [];
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
    this.employee_id = this.route.snapshot.params["id"];
  }

  ngOnInit() {
    this.employeeService.getEmployeeData(this.employee_id).subscribe((res: any) => {
      this.employeeData = res.data.employeeData;
      this.name_abr = this.employeeData.firstname[0] + this.employeeData.lastname[0];
      this.employeeFirstName = this.employeeData.firstname;
    });

    this.scheduleService.getEmployeeSchedule(this.employee_id).subscribe((res) => {
      this.scheduleData = res.data.userSchedule;
      this.generateSchedule();
    })
  }

  generateSchedule(): void {
    const [year, month] = this.selectedDate.split('-').map(Number);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    let currentDay = startDate;

    this.schedule = [];

    while (currentDay <= endDate) {
      const day: number = currentDay.getDate();
      const dayName: string = this.getDayName(currentDay.getDay());
      const isVacation: boolean = this.isOfficialVacation(currentDay, this.officialVacations);

      let scheduleEntry = {
        day,
        dayName,
        isVacation,
        status: '',
        actualStartTime: '',
        year,
        month,
        actualEndTime: '',
        shiftStartTime: '08:00',
        shiftEndTime: '16:00',
      };

      if (this.scheduleData.length > 0) {
        let date = this.formatDate(month, day, year);

        this.scheduleData.filter((val: any, index: any) => {
          if (val.date == date) {
            scheduleEntry = {
              ...scheduleEntry,
              status: val.status,
              actualStartTime: val.actualStartTime,
              actualEndTime: val.actualEndTime,
            };
          }
          return 0;
        })
      }

      this.newDay.push(scheduleEntry);

      if (currentDay.getDay() === 6 || day === endDate.getDate()) {
        this.schedule.push(this.newDay);
        this.newDay = []
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }

  }

  isCurrentDate(day: { day: number, dayName: string, isVacation: boolean }): boolean {
    const currentDate = new Date();
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);

    return dayDate.toDateString() === currentDate.toDateString();
  }

  isOfficialVacation(date: Date, officialVacations: Date[]): boolean {
    const dateString = date.toISOString().split('T')[0]; // Convert date to string in YYYY-MM-DD format

    return officialVacations.some(vacation => vacation.toISOString().split('T')[0] === dateString);
  }

  statuschange(e: any, weekNo: number, dayNo: number) {
    e.target.classList = e?.target.value;
    const selectedRow = this.schedule.flat()[weekNo];

    let date = this.formatDate(this.schedule[weekNo][dayNo]["month"], this.schedule[weekNo][dayNo]["day"], this.schedule[weekNo][dayNo]["year"])

    if (selectedRow.status === "present") {
      this.schedule[weekNo][dayNo]["actualStartTime"] = "08:00";
    } else {
      this.schedule[weekNo][dayNo]["actualStartTime"] = "";
    }
    let data = { ...this.schedule[weekNo][dayNo], "employee_id": this.employee_id };

    this.scheduleService.checkExistence(this.employee_id, { "date": date }).subscribe((res) => {
      if (res.data) {
        this.editSchedule(weekNo, dayNo)
      } else {
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
    })
  }

  editSchedule(weekNo: number, dayNo: number): void {
    this.scheduleService.updateEmployeeSchedule(this.employee_id, this.schedule[weekNo][dayNo]).subscribe({
      next: res => {
        Swal.fire(
          {
            icon: "success",
            title: "Attendance updated successfully",
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
    });
  }

  getDayName(dayIndex: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
  }

  formatDate(month: number, day: number, year: number) {
    return (month < 10 ? "0" : "") + month + '-' +
      (day < 10 ? "0" : "") + day + '-' + year;
  }
}
