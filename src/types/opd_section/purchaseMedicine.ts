interface Purchases {
    id: string,
    date: string,
    expiry_date: string,
    amount: number,
    supplier_name: string,
    tax: string,
    purchase_price: number,
    quantity: number,
    discount: string,
    total_amount: number,
    medicine: {
        name: string,
        group: string
    }
}


export interface medicinePurchases {
    data: Purchases[],
    total_pages: number
}



export interface medicinePurchaseDetails {
    id: string,
    categoryId: number,
    medicineId: number,
    supplier_name: string,
    batch_no: string,
    date: string,
    expiry_date: string,
    MRP: 200,
    sale_price: string,
    packing_quantity: string,
    quantity: number,
    purchase_price: string,
    tax: string,
    discount: string,
    amount: number,
    total_amount: number,
    payment_mode: string,
    note: string,
    createdAt: string,
    category: {
        name: string,
    },
    medicine: {
        name: string,
        group: {
            id: number,
            name: string,
        }
    }
}