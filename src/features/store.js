import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import setTimeOutSlice from "./slices/setTimeOutSlice";
import fileSlice from "./slices/fileSlice";
import folderSlice from "./slices/folderSlice";
import OpenOfCreationAndDeletionCompSlice from "./slices/OpenOfCreationAndDeletionCompSlice";

export const store = configureStore({
    reducer: {
        UserLogin: userLoginSlice,
        TimeOutID: setTimeOutSlice,
        Files: fileSlice,
        Folders: folderSlice,
        OpenOfCreationAndDeletionComp: OpenOfCreationAndDeletionCompSlice,
    }
})