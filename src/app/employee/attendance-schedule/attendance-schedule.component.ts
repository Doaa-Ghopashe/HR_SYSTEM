import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance-schedule',
  templateUrl: './attendance-schedule.component.html',
  styleUrls: ['./attendance-schedule.component.css']
})
export class AttendanceScheduleComponent {
  currentDate: string;
  selectedDate: string;
  calendar: { day: number, dayName: string }[][] = [];

  constructor() {
    this.currentDate = new Date().toISOString().substring(0, 7);
    this.selectedDate = this.currentDate;
    this.generateCalendar();
  }

  generateCalendar(): void {
    const [year, month] = this.selectedDate.split('-').map(Number);

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    let currentDay = startDate;
    let week: { day: number, dayName: string }[] = [];

    this.calendar = [];

    while (currentDay <= endDate) {
      const day: number = currentDay.getDate();
      const dayName: string = this.getDayName(currentDay.getDay());

      week.push({ day, dayName });

      if (currentDay.getDay() === 6 || day === endDate.getDate()) {
        this.calendar.push(week);
        week = [];
      }

      currentDay.setDate(currentDay.getDate() + 1);
    }
  }

  getDayName(dayIndex: number): string {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return weekdays[dayIndex];
  }
}
