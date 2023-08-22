import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceScheduleComponent } from './attendance-schedule.component';

describe('AttendanceScheduleComponent', () => {
  let component: AttendanceScheduleComponent;
  let fixture: ComponentFixture<AttendanceScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AttendanceScheduleComponent]
    });
    fixture = TestBed.createComponent(AttendanceScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
