export interface CompanySearch {
    symbol: string;
    name: string;
    currency: string;
    stockExchange: string;
    exchangeShortName: string;
    logo: string | undefined;
    price: CompanyRealtimePrice | undefined;
}

export interface CompanyRealtimePrice {
    bidSize: number;
    askPrice: number;
    volume: number;
    askSize: number;
    bidPrice: number;
    lastSalePrice: number;
    lastSaleSize: number;
    lastSaleTime: number;
    fmpLast: number;
    lastUpdated: number;
    symbol: stringnumber;
}