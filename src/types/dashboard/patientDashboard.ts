
export type PatientDashTotalCount = {
    appointments: number,
    opds: number,
    ipds: number,
    pharmacies: number,
    radiology: number
    pathology: number
    issueBlood: number,
    issueBloodComponent: number,
    ambulance: number
}



export type ExpenseReportType = {
    month: string
    Expense: number
}[]



export type AppointmentReportType = {
    appointments: {
        "status": string,
        "count": number,
        "fill": string,
    }[],
    total: number
}


export type Expenses = {
    "expenses": number
}