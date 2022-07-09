import {setError} from "../Reducers/alertSlice";

export function axiosErrors(error, dispatch, setError) {
    if (error.response) {
        dispatch(setError({
            message: error.message,
            status: error.response.status
        }))
    } else if (error.request) {
        dispatch(setError({
            status: error.request.status,
            message: error.message,
        }))
    } else {
        dispatch(setError({
            status: "",
            message: error.message
        }))
    }
}

