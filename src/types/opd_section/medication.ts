export interface opdMedicationData {
    id: number,
    opdId: number,
    medicineId: number,
    date: string,
    time: string,
    dose: string,
    note: string,
    category: {
        id: number,
        name: string
    },
    medicine: {
        name: string,
        unit: {
            id: number,
            name: string
        }
    }
}

export type opdMedications = {
    data: opdMedicationData[],
    total_pages: number
}


export interface medicationDetail {
    id: number,
    opdId: string,
    categoryId: number,
    medicineId: number,
    date: string,
    time: string,
    dose: string,
    note: string,
    medicine: {
        name: string,
        category: {
            name: string,
        }
    }
}