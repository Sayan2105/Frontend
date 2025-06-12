
export interface chargeListDataType {
    id: number
    opdId: number
    standard_charge: number,
    tpa: number,
    date: string,
    total: number,
    tax: number,
    discount: number,
    net_amount: number,
    chargeType: {
        id: number,
        charge_type: string,
    },
    chargeNames: {
        id: number,
        name: string,
    }
}


// it is a object which field is containing array of object and a numberd field

export interface ChargeListType {
    data: chargeListDataType[],
    total_pages: number
}



export interface ChargeDetailsType {
    id: number,
    opdId: number,
    chargeTypeId: number,
    categoryId: number,
    chargeNameId: number,
    standard_charge: number,
    tpa: number,
    date: string
    total: number,
    tax: number,
    discount: number,
    net_amount: number,
    chargeType: {
        id: number,
        charge_type: string
    },
    chargeCategory: {
        id: number,
        category: string
    },
    chargeNames: {
        id: number,
        name: string
    }

}