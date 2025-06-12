export interface operationDetailsType {  // it is only object (return by server)
    id: string,
    patientId: number,
    opdId: number,
    ipdId : number,
    categoryId: number,
    oprNameId: number,
    date: string,
    doctorId: number,
    assistant_1: string,
    assistant_2: string,
    anesthetist: string,
    anesthesia_type: string,
    ot_technician: string,
    ot_assistant: string,
    note: string,
    result: string,
    operationName: {
        name: string
    },
    operationCategory: {
        name: string
    },
    doctor: {
        name: string,
    }
}



export interface operation {
    id: string,
    opdId: number,
    date: string,
    ot_technician: string,
    operationName: {
        name: string,
    },
    operationCategory: {
        name: string,
    }
}


export interface PaginatedOperations {
    data: operation[],
    total_pages: number
}