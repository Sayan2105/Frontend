type DonorData = {
    id: number;
    name: string;
    dob: string; // ISO date string
    blood_group: string;
    gender: 'Male' | 'Female' | 'Other'; // or just `string` if it's more open-ended
    father_name: string;
    contact: string;
};


export type PaginatedDonors = {
    data: DonorData[];
    total_pages: number;
}



// Donations


type DonationData = {
    id: number
    donorId: number
    blood_group: string
    bag: string
    expiry: string
    status: 'USED' | 'AVAILABLE'
    donor: {
        name: string
        gender: string
        contact: string
    }
}


export type PaginatedDonations = {
    data: DonationData[];
    total_pages: number;
}


export type bagType = Array<{
    id: number
    bag: string
}>




// Issue Blood

type IssueBloodData = {
    id: string;
    doctor: string;
    date: string;
    bag: string;
    blood_group: string;
    standard_charge: number;
    tax: number;
    discount: number;
    net_amount: number;
    patient: {
        name: string;
        gender: 'male' | 'female' | 'other';
        image: string
    };
};


export type PaginantedIssueBlood = {
    data: IssueBloodData[];
    total_pages: number;
}



export type IssuedBloodInfo = {
    id: string;
    patientId: number;
    doctor: string;
    blood_group: string;
    date: string;
    bag: string;
    chargeTypeId: number;
    chargeCategoryId: number;
    chargeNameId: number;
    chargeType: { charge_type: string },
    chargeCategory: { category: string },
    chargeName: { name: string }
    standard_charge: number;
    tax: number;
    taxRate: number;
    discount: number;
    discountRate: number;
    payment_mode: string;
    payment_info: string;
    note: string;
    net_amount: number;
    createdAt: string;
    patient: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };
}


// blood component

type BloodComponentData = {
    id: number
    name: string
    lot: number
    institution: string
    bag: string
    blood_group: string
    status: string
}


export type PaginantedBloodComponents = {
    data: BloodComponentData[];
    total_pages: number;
};


export type BloodComponentBags = Array<{
    bag: string
}>


// everything is same except this
interface BloodComponentIssueData extends IssueBloodData {
    component: string;
};



export type PaginantedBloodComponentIssue = {
    data: BloodComponentIssueData[];
    total_pages: number;
}


// other things are same except this
export interface IssuedBloodComponentInfo extends IssuedBloodInfo {
    component: string
}