export interface paymentData {
    id: string,
    caseId: number,
    date: string,
    amount: number,
    paid_amount: number,
    balance_amount: number,
    payment_mode: string,
    note: string,
    charge: { id: number, chargeNames: { name: string } }[]
}


export interface Payment {
    data: paymentData[],
    total_pages: number
}