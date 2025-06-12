export type prescriptionDetail = {
    id: number,
    opdId: string,
    ipdId: string,
    header_note: string,
    prescMedicines: {
        medicineId: number,
        categoryId: number,
        doseDurationId: number,
        doseIntervalId: number,
        category: {
            name: string
        },
        medicine: {
            name: string
        },
        doseInterval: {
            interval: string
        },
        doseDuration: {
            duration: string
        },
        instruction: string
    }[],

    prescFindings: {
        findingCategoryId: number,
        findingNameId: number,
        findingCategory: {
            name: string,
        },
        findingName: {
            name: string,
        },
        description: string,
    }[]

    opd: {
        appointment: {
            patient: {
                name: string,
            },
            doctor: {
                name: string
            }
        }
    },
    ipd: {
        date: string,
        patient: {
            name: string
        },
        doctor: {
            name: string
        }
    }
}



// Prescriptions

export type PrescriptionsType = {
    id: number,
    ipdId: string | null,
    opdId: string | null
    prescFindings: [
        {
            findingName: {
                name: string
            },
            description: string
        }
    ]
}