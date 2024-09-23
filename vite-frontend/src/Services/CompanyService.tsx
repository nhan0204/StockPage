import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5117/api/company/";

export const getCompanyLogoAPI = async(symbol: string) => {
    try {
        const response = await axios.get<string>(api + `logo/${symbol}`);
        
        if (response)
            return response.data;
    } catch(error) {
        handleError(error);
    }
}

export const getCompanyPeersGroupAPI = async(symbol: string) => {
    try {
        const response = await axios.get<string[]>(api + `peers/${symbol}`);

        if (response)
            return response;
    } catch(error) {
        handleError(error);
    }
}