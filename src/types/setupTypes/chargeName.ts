export interface chargeNameDetailsType {
    id: number,
    name: string,
    categoryId: number,
    standard_charge: number,
    tpa: number,
    unitId: number,
    taxId: number,
    tax_percentage: number,
    description: string,
    chargeCategory: {
        category: string,
        chargeType: {
            id: number,
            charge_type: string,
        }
    }
}


export interface chargeNamesType {
    data: chargeNameDetailsType[],
    total_pages: number
}