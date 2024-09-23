import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentGet, CommentPost } from "../Models/Comment";

const api = "http://localhost:5117/api/comment/";

export const commentPostAPI = async(title: string, content: string, symbol: string) => {
    try {
        const response = await axios.post<CommentPost>(api + symbol, {
            title: title,
            content: content
        });
        return response;
    } catch(error) {
        handleError(error);
    }
} 

export const commentGetAPI = async(symbol: string) => {
    try {
        const response = await axios.get<CommentGet[]>(api + `?Symbol=${symbol}`);
        return response;
    } catch(error) {
        handleError(error);
    }
}