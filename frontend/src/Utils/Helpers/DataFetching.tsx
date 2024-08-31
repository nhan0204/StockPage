import axios, { AxiosResponse } from "axios";

export async function fetchData<T>(request: string): Promise<AxiosResponse<T> | string> {
    try {
        const response = await axios.get<T>(request);
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