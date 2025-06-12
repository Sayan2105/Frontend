export interface paginatedNews {
    data: {
        id: number,
        title: string
        description: string,
        date: string,
        pdf?: string,
        url?: string,
    }[],
    total_pages: number,
}


export interface AnnualCalendarType {
    id: number,
    date: string,
    description: string,
    type: string,
    to?: string,
}


export interface HomeEventType {
    data: {
        id: number
        title: string
        description: string
        date: string
    }[],
    total_pages: number
}