import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    createFileCompState: false,
    createFolderCompState: false,
    deleteFilesCompState: false,
    deleteFoldersCompState: false
}

const OpenOfCreationAndDeletionCompSlice = createSlice({
    name: "OpenOfCreationAndDeletionComp",
    initialState,
    reducers: {

        openCreateFileComp: (state) => {
            state.createFileCompState = true
        },

        closeCreateFileComp: (state) => {
            state.createFileCompState = false
        },

        openCreateFolderComp: (state) => {
            state.createFolderCompState = true
        },

        closeCreateFolderComp: (state) => {
            state.createFolderCompState = false
        },

        openDeleteFilesComp: (state) => {
            state.deleteFilesCompState = true
        },

        closeDeleteFilesComp: (state) => {
            state.deleteFilesCompState = false
        },

        openDeleteFoldersComp: (state) => {
            state.deleteFoldersCompState = true
        },

        closeDeleteFoldersComp: (state) => {
            state.deleteFoldersCompState = false
        },

    }
})

export const { openCreateFileComp, closeCreateFileComp, openCreateFolderComp, closeCreateFolderComp, openDeleteFilesComp, closeDeleteFilesComp, openDeleteFoldersComp, closeDeleteFoldersComp } = OpenOfCreationAndDeletionCompSlice.actions

export default OpenOfCreationAndDeletionCompSlice.reducer