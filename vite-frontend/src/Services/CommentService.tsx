import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { CommentPost } from "../Models/Comment";

const api = "http://localhost:5117/api/comment/";

export const commentPostAPI = async(title: string, content: string, symbol: string) => {
    try {
        const data = await axios.post<CommentPost>(api + symbol, {
            title: title,
            content: content
        });
        return data;
    } catch(error) {
        handleError(error);
    }
} 