import { VitalType } from "../opd_section/vitals"

type IpdDataType = {
    id: string
    date: string
    patientId: number
    Prescription: { id: number }
    doctorId: number
    bedGroupId: number
    bedId: number
    symptom_type: string
    casualty: string
    patient: {
        name: string
        phone: string
        gender: string
        image: string
    },
    doctor: {
        name: string
        gender: string
        image: string
    },
    bedGroup: {
        name: string
    },
    bed: {
        name: string
    }
}


export type PaginatedIpdType = {
    data: IpdDataType[],
    total_pages: number
}


export type IpdInfo = {
    id: string;
    patientId: number;
    date: string;
    opdId: string;
    casualty: string
    old_patient: string
    reference: string;
    doctorId: number;
    bedGroupId: number;
    bedId: number;
    symptom_type: string;
    symptom_description: string;
    previous_medical_issue: string;
    note: string;
    patient: {
        name: string;
        phone: string;
    };
    doctor: {
        name: string;
    };
    bedGroup: {
        name: string;
    };
    bed: {
        name: string;
    };
}


type IpdTreamentHisInfo = Array<{
    id: string
    date: string
    symptom_type: string
    casualty: string,
    doctor: {
        name: string
    },
    bedGroup: {
        name: string
    },
    bed: {
        name: string
    }
}>


export type PaginatedIpdTreatmentHisInfo = {
    data: IpdTreamentHisInfo,
    total_pages: number
}


export type IpdRadLabInvestigation = Array<{
    RadiologyBillItems: Array<{
        id: number
        reportDays: number
        reportDate: string
        testName: {
            name: string
        },
        RadioSampleCollection: {
            id: number
        },
        RadiologyReport: {
            id: number
        }
    }>
}>


export type IpdPatLabInvestigation = Array<{
    PathologyBillItems: Array<{
        id: number
        reportDays: number
        reportDate: string
        testName: {
            name: string
        },
        PathSampleCollection: {
            id: number
            date: string
            center: string
            staff: {
                name: string
            }
        },
        PathologyReport: {
            id: number
            date: string
            staff: {
                name: string
            }
        }
    }>
}>



// Ipd overview

export type IpdOverviewType = {
    id: string;
    patientId: number;
    patient: {
        name: string;
        phone: string;
        age: string;
        gender: string;
        blood_group: string;
        address: string;
        email: string;
        image: string | null;
        guardian_name: string;
        aadhar: string;
        alergies: string;
    };
    doctorId: number;
    doctor: {
        name: string;
        email: string;
        image: string | null;
        gender: string;
    };
    Vitals: VitalType[];
    symptom_description: string;
    Timeline: Array<{
        id: number;
        opdId: string | null;
        ipdId: string;
        title: string;
        date: string;
        description: string;
        patientId: number | null;
    }>;
    medications: Array<{
        medicine: {
            name: string;
        };
        category: {
            name: string;
        };
        time: string;
        date: string;
        dose: string;
    }>;
    Operation: Array<{
        id: string;
        date: string;
        ot_technician: string;
        operationName: {
            name: string;
        };
        operationCategory: {
            name: string;
        };
    }>;
    Charge: Array<{
        date: string;
        chargeNames: {
            name: string;
        };
        standard_charge: number;
        tpa: number;
        net_amount: number;
    }>;
    Payment: Array<{
        id: string;
        date: string;
        payment_mode: string;
        amount: number;
    }>;
    bed: {
        name: string;
        group: {
            name: string;
            floor: {
                name: string;
            };
        };
    },
    Discharge: {
        id: number,
    }
}



export type IpdInvoice = {
    id: string
    patientId: number,
    patient: {
        name: string
        address: string
        phone: string
        email: string
    },
    Charge: Array<{
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