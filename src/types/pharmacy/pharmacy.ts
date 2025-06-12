export interface medicines {
    id: number
    name: string,
    company: {
        id: number
        name: string,
    },
    composition: string,
    category: {
        id: number
        name: string,
    },
    group: {
        id: number
        name: string,
    },
    quantity: number
}



export interface paginatedMedicines {
    data: medicines[],
    total_pages: number
}


export interface medicineDetails {
    id: number,
    name: string,
    categoryId: number,
    companyId: number,
    composition: string,
    groupId: number,
    unitId: number,
    min_level: string,
    reorder_level: string,
    quantity: number,
    vat: string,
    rack_no: string,
    note: string,
    category: {
        id: number,
        name: string,
    },
    company: {
        id: number,
        name: string,
    },
    unit: {
        id: number,
        name: string,
    },
    group: {
        id: number,
        name: string,
    }
}


export type medicinesBYcategory = {
    id: number,
    name: string,
    quantity: number
}


export type medicineBatch = {
    id: number,
    purchaseId: string,
    purchaseMedicine: {
        batch_no: string,
    }
}


export type medicineBatchDetails = {
    id: number,
    medicineId: number,
    purchaseId: string,
    quantity: number,
    expiryDate: string,
    purchaseMedicine: {
        tax: string,
        expiry_date: string,
        sale_price: string,
    }
}


type pharmacyBillData = {
    id: string,
    opdId: string,
    patientId: number,
    doctor: string,
    date: string,
    discount: number,
    net_amount: number,
    patient: {
        name: string,
        gender: string,
        image: string,
    }
}


export type pharmacyBills = {
    data: pharmacyBillData[],
    total_pages: number
}


type billItems = {
    quantity: number,
    tax: number,
    salePrice: number,
    amount: number,
    batch: {
        purchaseMedicine: {
            batch_no: string
        }
    },
    category: {
        name: string
    },
    medicine: {
        name: string,
        unit: {
            name: string
        }
    }
}

export type pharmacyBillDetail = {
    id: string,
    opdId: string,
    patientId: number,
    doctor: string,
    date: string,
    discount: number,
    net_amount: number,
    note: string,
    createdAt: string,
    patient: {
        name: string,
        address: string
        phone: string,
        email: string,
    },
    items: billItems[]
}