export type BedType = {
    id: number,
    name: string
    groupId: number,
    status: string,
    group: {
        name: string
        floor: {
            id: number,
            name: string
        }
    }
}


export type PaginatedBedType = {
    data: BedType[],
    total_pages: number
}