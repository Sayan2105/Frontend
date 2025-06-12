export type RadioParametersType = {
    id: number,
    name: string
    unitId: number,
    from: string,
    to: string,
    note: string,
    unit: {
        name: string
    }
}



// category

export type RadioCategoryType = {
    id: number,
    name: string
}


type RadiologyTestNameData = {
    id: number,
    name: string,
    shortName: string,
    testType: string,
    categoryId: number,
    reportDays: number,
    standardCharge: number,
    tax: number,
    amount: number,
    category: {
        name: string
    }
}


export type RadiologyTestNameType = {
    data: RadiologyTestNameData[]
    total_pages: number
}

export type Parameter = {
    id: number,
    name: string,
    note: string,
    from: string
    to: string
    unit: {
        name: string
    }
}

export type RadioTestNameParameter = Array<{
    id: number
    radioTestId: number
    parameterId: number
    parameter: Parameter
}>


export type RadiologyTestNameDetailsType = {
    id: number,
    name: string,
    shortName: string,
    testType: string,
    categoryId: number,
    reportDays: number,
    method: string,
    chargeTypeId: number,
    chargeCategoryId: number,
    chargeNameId: number,
    standardCharge: number,
    tax: number,
    amount: number,
    category: {
        id: number,
        name: string
    },
    RadioTestNameParameter: Array<{
        id: number,
        radioTestId: number,
        parameterId: number,
    }>
}
