export interface findingCategory {
    "id": number,
    "name": string
}


export interface findingName {
    "id": number,
    "name": string,
    "categoryId": number,
    "description": string,
    "category": {
        "name": string
    }
}