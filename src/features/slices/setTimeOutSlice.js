import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeOutID: null
}

const setTimeOutSlice = createSlice({
    name: "TimeOutID",
    initialState,
    reducers: {
        storeID: (state, action) => {
            state.timeOutID = action.payload
        },

        removeID: (state) => {
            state.timeOutID = null
        }
    }
})

export const { storeID, removeID } = setTimeOutSlice.actions
export default setTimeOutSlice.reducer