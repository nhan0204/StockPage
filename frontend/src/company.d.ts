export interface CompanySearch {
    symbol: string;
    name: string;
    currency: string;
    stockExchange: string;
    exchangeShortName: string;
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

export interface CompanyProfile {
    symbol: string;
    price: number;
    beta: number;
    volAvg: number;
    mktCap: number;
    lastDiv: number;
    range: string;
    changes: number;
    companyName: string;
    currency: string;
    cik: string;
    isin: string;
    cusip: string;
    exchange: string;
    exchangeShortName: string;
    industry: string;
    website: string;
    description: string;
    ceo: string;
    sector: string;
    country: string;
    fullTimeEmployees: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    dcfDiff: number;
    dcf: number;
    image: string;
    ipoDate: string;
    defaultImage: boolean;
    isEtf: boolean;
    isActivelyTrading: boolean;
    isAdr: boolean;
    isFund: boolean;
}

export interface CompanyPeerGroup {
    peerList: string[];
}

export interface CompanySectorFilings {
    symbol: string;
    fillingDate: string;
    acceptedDate:  string;
    cik: string;
    type: string;
    link: string;
    finalLink: string;
}