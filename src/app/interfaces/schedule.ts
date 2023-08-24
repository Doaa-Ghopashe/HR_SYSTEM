export interface Schedule {
    month: number;
    year:number;
    day: number;
    dayName: string;
    isVacation: boolean;
    status: string;
    actualstarttime: string;
    actualendtime: string;
    shiftstarttime: string;
    shiftendtime: string;
    extratimes: number
}
