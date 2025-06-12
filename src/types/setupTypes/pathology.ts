export type PathParametersType = {
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

export type PathCategoryType = {
    id: number,
    name: string
}



type PathologyTestNameData = {
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


export type PathologyTestNameType = {
    data: PathologyTestNameData[]
    total_pages: number
}


export type PathologyTestNameDetailsType = {
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
    PathTestNameParameter: Array<{
        id: number,
        pathTestId: number,
        parameterId: number,
    }>
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

export type PathTestNameParameter = Array<{
    id: number
    pathTestId: number
    parameterId: number
    parameter: Parameter
}>