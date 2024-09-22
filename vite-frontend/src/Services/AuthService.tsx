import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5117/api";

export const registerAPI = async (email:string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "/account/register", {
            username: username,
            email: email,
            password: password
        })
        
        return data;
    } catch(error) {
        handleError(error);
    }
}

export const loginAPI = async (username: string, password: string) => {
    try {
        console.log(username, ' ', password);
        const data = await axios.post<UserProfileToken>(api + "/account/login", {
            username: username,
            password: password
        })

        return data;
    } catch(error) {
        handleError(error);
    }
}