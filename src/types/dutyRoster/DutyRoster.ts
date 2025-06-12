export interface RosterDataType {
    id: number;
    staffId: number;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftStartDate: string;
    shiftEndDate: string;
    shift: string;
    note: string;
    staff: {
        name: string
        department: string
        image: string
        gender: string
    }
}



export type Rosters = {
    data: RosterDataType[],
    total_pages: number
}