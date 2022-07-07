import {configureStore} from "@reduxjs/toolkit";
import alertSlice from "../Reducers/alertSlice";

export default configureStore({
    reducer: {
        alert: alertSlice
    }
})