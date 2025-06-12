 export type ConsultantRegister = {
    id: number,
    applied_date: string,
    consultant_date: string,
    doctorId: number,
    doctor: {
        name: string
    }
    instructions: string
}


export type PaginatedConsultantRegister = {
    data: ConsultantRegister[],
    total_pages: number
}