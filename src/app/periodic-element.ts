export interface PeriodicElement {
    position: number,
    name: string,
    weight: number,
    symbol: string
}

export interface TableState {
    data: PeriodicElement[],
    filteredData: PeriodicElement[],
    filter: string
}