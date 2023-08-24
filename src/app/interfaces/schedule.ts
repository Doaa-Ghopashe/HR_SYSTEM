export interface Schedule {
    month: number;
    year:number;
    day: number;
    dayName: string;
    isVacation: boolean;
    status: string;
    actualStartTime: string;
    actualEndTime: string;
    shiftStartTime: string;
    shiftEndTime: string;
}
