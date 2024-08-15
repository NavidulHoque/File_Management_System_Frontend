import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user098")) || null
}

const userLoginSlice = createSlice({
    name: "UserLogin",
    initialState,
    reducers:{
        LogIn: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user098", JSON.stringify(state.user))
        },

        LogOut: (state) => {
            state.user = null
            localStorage.setItem("user098", JSON.stringify(state.user))
        }
    }
})

export const { LogIn, LogOut } = userLoginSlice.actions
export default userLoginSlice.reducer