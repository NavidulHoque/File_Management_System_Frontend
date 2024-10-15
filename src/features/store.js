import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";

export const store = configureStore({
    reducer: {
        UserLogin: userLoginSlice
    }
})