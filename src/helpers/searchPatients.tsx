import { Patients } from "@/types/type"

export const searchPatients = (search: string, patients: Patients[]) => {
    const filteredPatients = patients?.filter((patient) => {
        return patient.name.toLowerCase().includes(search.toLowerCase())
    })

    return filteredPatients
}