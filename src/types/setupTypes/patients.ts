export type PatientsData = {
    id: number,
    name: string,
    gender: string,
    dob: string,
    email: string,
    phone: string,
    age: string,
    guardian_name: string,
    blood_group: string,
    image: string,
    isAlive: boolean,
}



export type SetupPatients = {
    data: PatientsData[],
    total_pages: number
}