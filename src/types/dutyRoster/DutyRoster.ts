export interface RosterDataType {
    id: number;
    staffId: number;
    shiftStartTime: string;
    shiftEndTime: string;
    shiftStartDate: string;
    shiftEndDate: string;
    dutyAt: string;
    intervalMinutes: number;
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



export type AvailableOpdRosterDoctors = {
    data: Array<{
        id: number,
        staffId: number,
        staff: {
            name: string
            id: number,
            image: string,
            specialist: Array<{
                id: number,
                name: string
            }>,
            work_experience: string
            qualification: string
        }
    }>
    total_pages: number
}



export type RosterInfoForAppointment = {
    "staffId": number,
    "shiftStartDate": string,
    "shiftEndDate": string,
    "shiftStartTime": string,
    "shiftEndTime": string,
    "intervalMinutes": number,
    "staff": {
        "name": string,
        "image": string,
        "gender": string,
        "specialist": Array<{
            "id": number
            "name": string
        }>,
        "normal_fees": number
        "emergency_fees": number
        "qualification": string
        "work_experience": string
    },
    "bookedSlots": string[]
}
