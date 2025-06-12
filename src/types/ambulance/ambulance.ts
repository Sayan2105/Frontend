type AmbulanceType = {
    id: number;
    vehicleNumber: string;
    model: string;
    color: string;
    yearMade: number;
    driverName: string;
    driverContact: string;
    driverLicenseNumber: string;
    vehicleType: string;
}


export type PagintedAmbulance = {
    data: AmbulanceType[];
    total_pages: number;
}



// Assign Ambulance

export type AssignedAmbulanceInfo = {
    id: string;
    patientId: number;
    ambulanceId: number;
    chargeTypeId: number;
    chargeCategoryId: number;
    chargeNameId: number;
    kilometers: number;
    standard_charge: number;
    total: number;
    net_amount: number;
    payment_mode: string;
    payment_info: string;
    tax: number;
    tax_amount: number;
    discount: number;
    discount_amount: number;
    date: string; // ISO date string
    note: string;
    createdAt: string; // ISO timestamp

    patient: {
        name: string;
        address: string;
        phone: string;
        email: string;
    };

    ambulance: {
        model: string;
        vehicleNumber: string;
        driverName: string;
        driverContact: string;
        driverLicenseNumber: string;
    };

    chargeType: {
        charge_type: string;
    };

    chargeCategory: {
        category: string;
    };

    chargeName: {
        name: string;
    };
};



type AssignedAmbulancesData = {
    id: string;
    patientId: number;
    patient: {
        name: string;
        address: string;
        phone: string;
        email: string;
        image: string;
        gender: string;
    };
    ambulanceId: number;
    ambulance: {
        vehicleNumber: string;
        model: string;
        driverName: string;
        driverContact: string;
    };
    chargeName: {
        name: string;
    };
    standard_charge: number;
    total: number;
    kilometers: number;
    tax: number;
    discount: number;
    net_amount: number;
};



export type PaginatedAssignedAmbulances = {
    data: AssignedAmbulancesData[],
    total_pages: number
}