import { CompanyBalanceSheet, CompanyCashflowStatement, CompanyDividend, CompanyIncomeStatement, CompanyKeyMetrics, CompanyPeerGroup, CompanyProfile, CompanyRealtimePrice, CompanySearch, CompanySectorFilings } from "../company";
import { fetchData } from "../Helpers/DataFetching";

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

export const getCompanyLogo = async(query: string) => {
    const request = `https://financialmodelingprep.com/image-stock/${query}.png?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyLogoResponse>(request);
    
    if (typeof response === "string") 
        return "Api error" + response;

    return response.config.url;
}

interface GetCompanyPriceResponse {
    data: CompanyRealtimePrice[];
}

export const getCompanyPrice = async(query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/stock/full/real-time-price/${query}?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyPriceResponse>(request);
    return response;
}

interface GetCompanyProfileResponse {
    data: CompanyProfile[];
}

export const getCompanyProfile = async(query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanyProfileResponse>(request);
    return response;
}

interface GetCompanyPeerGroupsResponse {
    data: CompanyPeerGroup[];
}

export const getCompanyPeerGroup = async(query: string) => {
    const request = `https://finnhub.io/api/v1/stock/peers?symbol=${query}&token=${finHubApiKey}`;
    const response = await fetchData<GetCompanyPeerGroupsResponse>(request);
    return response;
}

interface GetCompanySectorFilingsResponse {
    data: CompanySectorFilings[];
}

export const getCompanySectorFilings = async(query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-k&page=0&apikey=${finPrepApiKey}`;
    const response = await fetchData<GetCompanySectorFilingsResponse>(request);
    return response;
}

interface GetKeyMetricsResponse {
    data: CompanyKeyMetrics[];
}

export const getKeyMetrics = async(query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?apikey=${finPrepApiKey}`;
    const response = await fetchData<GetKeyMetricsResponse>(request);
    return response;
}

interface GetIncomeStatementResponse {
    data: CompanyIncomeStatement[];
}

export const getIncomeStatement = async(query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/income-statement/${query}?period=annual&apikey=${finPrepApiKey}`;
    const respone = await fetchData<CompanyIncomeStatement>(request);
    return respone;
}

interface GetBalanceSheetResponse {
    data: CompanyBalanceSheet[];
}

export const getBalanceSheet = async (query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?period=annual&apikey=${finPrepApiKey}`;
    const respone = await fetchData<GetBalanceSheetResponse>(request);
    return respone;
}

interface GetCashflowStatementResponse {
    data: CompanyCashflowStatement[];
}

export const getCashflowStatement = async (query: string) => {
    const request = `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?period=annual&apikey=${finPrepApiKey}`;
    const respone = await fetchData<GetCashflowStatementResponse>(request);
    return respone;
}

interface GetWeaklyDividendResponse {
    data: CompanyDividend[];
}

export const getWeaklyDividend = async(query: string) => {
    // const request = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${query}&apikey=${alphaApiKey}`;
    const request = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSCO.LON&outputsize=full&apikey=demo`;
    const response = await fetchData<GetWeaklyDividendResponse>(request);
    return response;
}