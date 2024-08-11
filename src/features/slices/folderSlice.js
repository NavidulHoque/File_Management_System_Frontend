import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchFolderAPIs from "../APIs/fetchFolderAPIs";

const initialState = {
    currentFolder: JSON.parse(localStorage.getItem("currentFolder")) || "root",
    folders: [],
    isLoading: false,
    isError: false,
    error: ""
}

export const fetchFolders = createAsyncThunk("fetchFolders", (_, { getState }) => {
    const state = getState()
    const userID = state.UserLogin.user.id 
    const folders = fetchFolderAPIs(userID)
    return folders
})


const folderSlice = createSlice({
    name: "Folders",
    initialState,

    extraReducers: (builders) => {

        builders
            .addCase(fetchFolders.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(fetchFolders.fulfilled, (state, action) => {
                state.isLoading = false
                state.folders = action.payload
            })
            .addCase(fetchFolders.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
    },

    reducers: {

        addFolder: (state, action) => {
            state.folders = [...state.folders, action.payload];
        },

        deleteFolder: (state, action) => {
            state.folders = state.folders.filter(folder => folder.folderID !== action.payload)
        },

        updateFolder: (state, action) => {
            state.folders = state.folders.map(folder => {
                if (folder.folderID === action.payload.folderID) {
                    return action.payload
                }
                else{
                    return folder
                }
            })
        },

        changeCurrentFolder: (state, action) => {
            state.currentFolder = action.payload
            localStorage.setItem("currentFolder", JSON.stringify(state.currentFolder))
        }
    },
});

export const { addFolder, changeCurrentFolder, deleteFolder, updateFolder } = folderSlice.actions
export default folderSlice.reducer
