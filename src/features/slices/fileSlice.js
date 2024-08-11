import fetchFileAPIs from "../APIs/fetchFileAPIs";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
    files: [],
    isLoading: false,
    isError: false,
    error: ""
}

export const fetchFiles = createAsyncThunk("fetchFiles", (_, { getState }) => {
    const state = getState()
    const userID = state.UserLogin.user.id 
    const files = fetchFileAPIs(userID)
    return files
})

const fileSlice = createSlice({
    name: "Files",
    initialState,

    extraReducers: (builders) => {
        builders
            .addCase(fetchFiles.pending, (state) => {
                state.isError = false
                state.isLoading = true
            })
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.isLoading = false
                state.files = action.payload
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
    },

    reducers: {

        addFile: (state, action) => {
            state.files = [...state.files, action.payload];
        },

        deleteFile: (state, action) => {
            state.files = state.files.filter(file => file.fileID !== action.payload)
        },

        updateFileData: (state, action) => {
            state.files = state.files.map(file => {
                if (file.fileID === action.payload.fileID) {
                    return action.payload
                }
                else{
                    return file
                }
            })
        },

    },
});

export const { addFile, updateFileData, deleteFile } = fileSlice.actions
export default fileSlice.reducer