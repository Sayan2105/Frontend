import { Parameter } from "../setupTypes/pathology";

type TestName = {
    name: string;
};



type PathologyBillItem = {
    id: number,
    testNameId: number,
    testName: TestName;
    reportDays: number;
    reportDate: string;
    tax: number;
    amount: number;
    PathSampleCollection: {
        id: number
        staff: { name: string }
        date: string
        center: string
    },
    PathologyReport: {
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


export type PathologyBillDeatils = {
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
    PathologyBillItems: PathologyBillItem[];
};


type PathologyBillData = {
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


export type PaginatedPathologyBills = {
    data: PathologyBillData[];
    total_pages: number;
};



// sample collection

export type PathologySampleCollectionDet = {
    id: number,
    itemId: number
    staffId: number
    staff: { name: string }
    date: string
    center: string
}


export type PathTestReport = {
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