export interface AppointmentData {
    id: string,
    doctorId: number,
    patientId: number,
    shift: string,
    appointment_date: string,
    status: string,
    fees: number,
    discount: number,
    net_amount: number,
    payment_mode: string,
    appointment_priority: string,
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
    doctorId: number,
    patientId: number,
    specialistId: number,
    shift: string,
    appointment_date: string,
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