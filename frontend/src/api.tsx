import { CompanyPeerGroup, CompanyProfile, CompanyRealtimePrice, CompanySearch, CompanySectorFilings } from "./company";
import { fetchData } from "./Helpers/DataFetching";

const alphaApiKey = process.env.REACT_APP_ALPHA_API_KEY;
const finPrepApiKey = process.env.REACT_APP_FIN_PREP_API_KEY;
const finHubApiKey = process.env.REACT_APP_FIN_HUB_API_KEY;


interface SearchCompaniesResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${finPrepApiKey}`;
    const response = await fetchData<SearchCompaniesResponse>(request);
    return response;
}

interface GetCompanyLogoResponse {
    url: string;
}

export const getCompanyLogo = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyLogoResponse>(request);
    
    if (typeof response === "string") 
        return "Api error" + response;

    return response.config.url;
}

interface GetCompanyPriceResponse {
    data: CompanyRealtimePrice[];
}

export const getCompanyPrice = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/api/v3/stock/full/real-time-price/${symbol}?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyPriceResponse>(request);
    return response;
}

interface GetCompanyProfileResponse {
    data: CompanyProfile[];
}

export const getCompanyProfile = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyPriceResponse>(request);
    return response;
}

interface GetCompanyPeerGroupsResponse {
    data: CompanyPeerGroup[];
}

export const getCompanyPeerGroup = async(symbol: string) => {
    const request = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${finHubApiKey}`;
    const response = await fetchData<GetCompanyPriceResponse>(request);
    return response;
}

interface GetCompanySectorFilingsResponse {
    data: CompanySectorFilings[];
}

export const getCompanySectorFilings = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/api/v3/sec_filings/${symbol}?type=10-k&page=0&apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanySectorFilingsResponse>(request);
    return response;
}