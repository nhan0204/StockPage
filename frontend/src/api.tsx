import axios, { Axios } from "axios";
import { CompanyRealtimePrice, CompanySearch } from "./company";

const apikey = process.env.REACT_APP_API_KEY;

interface SearchCompaniesResponse {
    data: CompanySearch[];
}

export const searchCompanies = async (query: string) => {
    try {
        const request = `https://financialmodelingprep.com/api/v3/search-ticker?query=${query}&limit=10&exchange=NASDAQ&apikey=${apikey}`;
        const response = await axios.get<SearchCompaniesResponse>(request);
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return "An unexpected error has occured";
        }
    }
}

interface SearchCompanyLogoResponse {
    url: string;
}

export const searchCompanyLogo = async(symbol: string) => {
    try {
        const request = `https://financialmodelingprep.com/image-stock/${symbol}.png?apikey=${apikey}`;
        const response = await axios.get<SearchCompanyLogoResponse>(request);
        return response.config.url;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return "An unexpected error has occured";
        }
    }
}

interface SearchCompanyPriceResponse {
    data: CompanyRealtimePrice[];
}

export const searchCompanyPrice = async(symbol: string) => {
    try {
        const request = `https://financialmodelingprep.com/api/v3/stock/full/real-time-price/${symbol}?apikey=${apikey}`;
        const response = await axios.get<SearchCompanyPriceResponse>(request);
        return response;
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return "An unexpected error has occured";
        }
    }
}