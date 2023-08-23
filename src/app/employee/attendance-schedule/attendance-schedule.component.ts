import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces/employee';

@Component({
  selector: 'app-attendance-schedule',
  templateUrl: './attendance-schedule.component.html',
  styleUrls: ['./attendance-schedule.component.css']
})
export class AttendanceScheduleComponent {
  employees!:Employee[];
  currentDate: string;
  selectedDate: string;
  calendar: { day: number, dayName: string , isVacation:boolean}[][] = [];
  employee_id!:number;
  status:string = "present";
  employeeData!:Employee;
  name_abr!:string;
  isCurrentDate(day: { day: number, dayName: string, isVacation: boolean }): boolean {
    const currentDate = new Date();
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day);

    return dayDate.toDateString() === currentDate.toDateString();
  }
  officialVacations: Date[] = [
    new Date('2023-8-25'),
    new Date('2023-8-31'),
    new Date('2024-01-01'),
    new Date('2023-9-10')
  ];
  constructor(private route: ActivatedRoute) {
    this.employees=[
      {"id":1,"first_name":"Doaa","last_name":"Adel","email":"doaaadel@yahoo.com","role":"DevOps"},
      {"id":2,"first_name":"Sally","last_name":"Zahran","email":"sallyzahran@yahoo.com","role":"Financial Officer"},
      {"id":3,"first_name":"Sondos","last_name":"Ahmed","email":"sondosahmed@yahoo.com","role":"Accountant"},
      {"id":4,"first_name":"Aya","last_name":"Hamed","email":"ayahamed@yahoo.com","role":"Accountant"},
      {"id":5,"first_name":"Tabark","last_name":"Said","email":"tabarksaid@yahoo.com","role":"HR","password":"4528da"},
      {"id":6,"first_name":"Eman","last_name":"Elzahaby","email":"emanelzahby@yahoo.com","role":"HR","password":"5d645sdfs"},
    ]
    this.currentDate = new Date().toISOString().substring(0, 7);
    this.selectedDate = this.currentDate;
    this.generateCalendar();
  }
  ngOnInit(){
    this.employee_id=this.route.snapshot.params["id"];
    this.employeeData = this.employees.filter((employee)=>{
      return employee.id == this.employee_id;
    })[0];
    this.name_abr = this.employeeData.first_name[0] + this.employeeData.last_name[0]
  }
  generateCalendar(): void {
    const [year, month] = this.selectedDate.split('-').map(Number);
  
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
  
    let currentDay = startDate;
    let week: { day: number, dayName: string, isVacation: boolean }[] = [];
  
    this.calendar = [];
  
    while (currentDay <= endDate) {
      const day: number = currentDay.getDate();
      const dayName: string = this.getDayName(currentDay.getDay());
      const isVacation: boolean = this.isOfficialVacation(currentDay, this.officialVacations);
  
      week.push({ day, dayName, isVacation });
  
      if (currentDay.getDay() === 6 || day === endDate.getDate()) {
        this.calendar.push(week);
        week = [];
      }
  
      currentDay.setDate(currentDay.getDate() + 1);
    }
  }
  
  isOfficialVacation(date: Date, officialVacations: Date[]): boolean {
    const dateString = date.toISOString().split('T')[0]; // Convert date to string in YYYY-MM-DD format
  
    return officialVacations.some(vacation => vacation.toISOString().split('T')[0] === dateString);
  }
  statuschange(e:any){
    e.target.classList = e?.target.value;
  }
  getDayName(dayIndex: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
  }
}
