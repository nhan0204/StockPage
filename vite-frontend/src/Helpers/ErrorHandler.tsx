import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (e: any) => {
    if (axios.isAxiosError(e)) {
        var errorResponse = e.response;
        var errorsData = errorResponse?.data;

        if (Array.isArray(errorsData)) {
            for (let e of errorsData) {
                toast.warning(e.description);
            }
        } else if (typeof errorsData.errors === 'object') {
            for (let e in errorsData.errors) {
                console.log(e)
                toast.warning(errorsData.errors[e][0]);
            }
        } else if (errorResponse?.data) {
            toast.warning(errorResponse.data);
        } else if (errorResponse?.status == 401) { // Unathorized error
            toast.warning("Please login");
            console.log(axios.defaults.headers.common["Authorization"])
            window.history.pushState({}, "LoginPage", "/login");
        } else if (errorResponse) {
            toast.warning(errorResponse?.data);
        } else {
            toast.warning(e.toString());
        }
    } else {
        toast.warning(e.toString());
    }
}