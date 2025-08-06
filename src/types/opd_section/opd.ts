import { chargeListDataType } from "./charges"
import { opdMedicationData } from "./medication"
import { operation } from "./operationType"
import { paymentData } from "./payment"
import { timeline } from "./timeline"
import { VitalType } from "./vitals"



interface opdData {  // it will be Array of objects
    id: string,
    patientId: number,
    doctorId: number,
    appointmentId: string,

    appointment: {
        date: string
        previous_medical_issue: string,
        reference: string,
        specialist: { name: string },
    },
    patient: {
        name: string,
        gender: string
        image: string
    },
    doctor: {
        name: string
        gender: string,
        image: string,
    },
    prescriptions: {
        id: number
    }
}


export interface OPDs {
    data: opdData[],
    total_pages: number
}


export interface opdDetails {
    id: number,
    appointmentId: string,
    appointment: {
        symptom_description: string,
        doctor: {
            id: number,
            name: string,
            image: string,
            gender: string
        },
        patient: {
            id: number,
            name: string,
            gender: string,
            guardian_name: string,
            aadhar: string,
            address: string,
            phone: string,
            blood_group: string,
            age: string,
            image: null | string,
            alergies: string
        }
    },
    medications: opdMedicationData[],
    Vitals: VitalType[],
    Operations: operation[],
    timelines: timeline[],
    charges: chargeListDataType[],
    Payments: paymentData[]
}



export interface PrintBillDetails {
    id: string
    patientId: number,
    patient: {
        name: string
        address: string
        phone: string
        email: string
    },
    charges: Array<{
        chargeCategory: {
            category: string
        },
        chargeNames: {
            name: string
        }
        total: number
        discount: number
        standard_charge: number
        tax: number
        tpa: number
        net_amount: number
    }>
}