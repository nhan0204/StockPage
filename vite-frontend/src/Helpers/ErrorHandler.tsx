import axios from "axios"
import { toast } from "react-toastify";

export const handleError = (e: any) => {
    if (axios.isAxiosError(e)) {
        var errorResponse = e.response;
        var errors = errorResponse?.data;

        if (Array.isArray(errors)) {
            for (let e of errors) {
                toast.warning(e.description);
            }
        } else if (typeof errors === 'object') {
            for (let e in errors) {
                toast.warning(errors[e][0]);
            }
        } else if (errorResponse?.data) {
            toast.warning(errorResponse.data);
        } else if (errorResponse?.status == 401) { // Unathorized error
            toast.warning("Please login");
            window.history.pushState({}, "LoginPage", "/login");
        } else if (errorResponse) {
            toast.warning(errorResponse?.data);
        }
    } else {
        toast.warning(e.toString());
    }
}