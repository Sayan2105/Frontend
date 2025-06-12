export interface Patients {
    id: number,
    name: string
}

// for appointment section coming from duty roster
export interface Doctors {
    shift: string,
    staff: {
        id: number,
        name: string,
        emergency_fees: number,
        normal_fees: number,
        image: string,
        gender: string,
        work_experience: string,
        qualification: string,
        specialist: Array<{
            id: number,
            name: string
        }>,
    }
}


export interface homepageDoctors {
    data: Array<{
        name: string
        id: number,
        phone: string
        image: string,
        specialist: Array<{
            id: number,
            name: string
        }>,
        work_experience: string
        qualification: string
    }>
    total_pages: number
}


// Params

export type Params = { page?: number, limit?: number, search?: string | null }

export type OIParams = { opdId?: string, ipdId?: string, patientId?: number }