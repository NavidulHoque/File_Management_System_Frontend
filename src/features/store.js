import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userLoginSlice";
import fileSlice from "./slices/fileSlice";
import folderSlice from "./slices/folderSlice";
import OpenOfCreationAndDeletionCompSlice from "./slices/OpenOfCreationAndDeletionCompSlice";

export const store = configureStore({
    reducer: {
        UserLogin: userLoginSlice,
        Files: fileSlice,
        Folders: folderSlice,
        OpenOfCreationAndDeletionComp: OpenOfCreationAndDeletionCompSlice,
    }
})