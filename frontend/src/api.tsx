import { CompanyPeerGroup, CompanyProfile, CompanyRealtimePrice, CompanySearch } from "./company";
import { fetchData } from "./Helpers/DataFetching";

const finPrepApiKey = process.env.REACT_APP_FIN_PREP_API_KEY;
const finHubApiKey = process.env.REACT_APP_FIN_HUB_API_KEY;


interface SearchCompaniesResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${finPrepApiKey}`;
    const data = await fetchData<SearchCompaniesResponse>(request);
    return data;
}

interface GetCompanyLogoResponse {
    url: string;
}

export const getCompanyLogo = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${finPrepApiKey}`;
    const data = await fetchData<GetCompanyLogoResponse>(request);
    
    if (typeof data === "string") 
        return "Api error" + data;

    return data.config.url;
}

interface GetCompanyPriceResponse {
    data: CompanyRealtimePrice[];
}

export const getCompanyPrice = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/api/v3/stock/full/real-time-price/${symbol}?apikey=${finPrepApiKey}`;
    const data = await fetchData<GetCompanyPriceResponse>(request);
    return data;
}

interface GetCompanyProfileResponse {
    data: CompanyProfile[];
}

export const getCompanyProfile = async(symbol: string) => {
    const request = `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=${finPrepApiKey}`;
    const data = await fetchData<GetCompanyPriceResponse>(request);
    return data;
}

interface GetCompanyPeerGroupsResponse {
    data: CompanyPeerGroup[];
}

export const getCompanyPeerGroup = async(symbol: string) => {
    const request = `https://finnhub.io/api/v1/stock/peers?symbol=${symbol}&token=${finHubApiKey}`;
    const data = await fetchData<GetCompanyPriceResponse>(request);
    return data;
}