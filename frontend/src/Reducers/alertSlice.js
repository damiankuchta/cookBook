import {createSlice} from "@reduxjs/toolkit";

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        message: '',
        status: '',
        displayAlert: false,
    },
    reducers: {
        setError: (state, action) => {
            state.messages = action.payload.message
            state.status = action.payload.status
            state.displayAlert = true
        },
        hideAlert: (state) => {
            state.displayAlert = false
        }
    }
})

export const {setError, hideAlert} = alertSlice.actions

export default alertSlice.reducer