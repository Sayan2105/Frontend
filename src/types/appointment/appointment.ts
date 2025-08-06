export interface AppointmentData {
    id: string,
    rosterId: number,
    doctorId: number,
    patientId: number,
    status: string,
    fees: number,
    discount: number,
    net_amount: number,
    payment_mode: string,
    appointment_priority: string,
    date: string,
    time: string,
    doctor: {
        name: string
        gender: string
        image: string
    },
    patient: {
        name: string,
        phone: string,
        gender: string,
        address: string,
        email: string,
        image: string
    }
}


export interface Appointment {
    data: AppointmentData[],
    total_pages: number
}



export interface AppointmentDetails {
    id: string,
    rosterId: number,
    doctorId: number,
    patientId: number,
    dateSlotId: number,
    specialistId: number,
    specialist: { name: string },
    appointment_priority: string,
    symptom_description: string,
    payment_mode: string,
    status: string,
    alternative_address: string,
    reference: string,
    previous_medical_issue: string,
    fees: number,
    discount: number,
    net_amount: number,
    date: string,
    time: string,
    patient: {
        name: string,
        phone: string,
        email: string,
        gender: string,
        age: string,
        blood_group: string,
        address: string,
    },
    doctor: {
        name: string,
        gender: string,
        phone: string,
        department: string,
    }
}