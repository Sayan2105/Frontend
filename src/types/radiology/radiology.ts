import { Parameter } from "../setupTypes/radiology";

type TestName = {
    name: string;
};



type RadiologyBillItem = {
    id: number,
    testNameId: number,
    testName: TestName;
    reportDays: number;
    reportDate: string;
    tax: number;
    amount: number;
    RadioSampleCollection: {
        id: number,
        itemId: number,
        staffId: number,
        date: string
        center: string
        staff: {
            name: string
        }
    },
    RadiologyReport: {
        id: number
    }
};

type Patient = {
    name: string;
    age: string;
    gender: string;
    blood_group: string;
    address: string,
    email: string,
    phone: string
};


export type RadiologyBillDeatils = {
    id: string;
    doctor: string;
    ipdId: string;
    patientId: number;
    date: string;
    previousReportValue: string;
    additionalTax: number;
    discount: number;
    net_amount: number;
    payment_mode: string;
    note: string;
    patient: Patient;
    RadiologyBillItems: RadiologyBillItem[];
};


type RadiologyBillData = {
    id: string;
    doctor: string;
    moduleId: string;
    patientId: number;
    patient: { name: string, gender: string, image: string };
    date: string;
    additionalTax: number;
    discount: number;
    net_amount: number;
    payment_mode: string;
};


export type PaginatedRadiologyBills = {
    data: RadiologyBillData[];
    total_pages: number;
};



// sample collection

export type RadiologySampleCollectionDet = {
    id: number,
    itemId: number
    staffId: number
    staff: { name: string }
    date: string
    center: string
}


export type RadioTestReport = {
    id: number
    itemId: number
    staffId: number
    date: string
    result: string
    reportValues: Array<{
        parameterId: number,
        parameter: Parameter,
        reportValue: string
    }>
    staff: {
        name: string
    }
    item: {
        testNameId: number,
        testName: { name: string }
    }
}