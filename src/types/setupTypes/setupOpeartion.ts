export interface operationCategoryType {
    "id": number,
    "name": string
}



export interface operationNameType {
    "id": number,
    "name": string,
    "categoryId": number,
    category: { name: string }
}