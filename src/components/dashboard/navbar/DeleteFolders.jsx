/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { closeDeleteFoldersComp } from "../../../features/slices/OpenOfCreationAndDeletionCompSlice";
import deleteFolderAndContents from "../../../functions/deleteFolderAndContents";
import { selectFoldersOfCurrentFolder } from "../../../memoization/selectFilesAndFoldersOfCurrentFolder";
import successToast from "../../../functions/successToast";
import errorToast from "../../../functions/errorToast";

const DeleteFolders = ({ deleteFoldersCompState }) => {
    const folders = useSelector((state) => state.Folders.folders)
    const foldersOfCurrentFolder = useSelector(selectFoldersOfCurrentFolder)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleDeleteFolder(folder) {

        try {
            setLoading(true)

            await deleteFolderAndContents(folder, folders, dispatch)

            setLoading(false)
            
            successToast("Folder deleted successfully")
        }

        catch (error) {

            setLoading(false)
            errorToast("Folder deletion failed, please try again")
        }
    }

    return (
        <>
            <ToastContainer />
            <div
                className={`fixed w-full top-0 left-0 h-screen justify-center bg-[rgba(0,0,0,0.4)] py-10 ${deleteFoldersCompState ? "flex z-10" : "hidden -z-10"
                    }`}
            >
                <div className="basis-[400px] rounded-md bg-white flex flex-col gap-y-5 relative p-[15px] overflow-y-auto">

                    <RxCross2
                        onClick={() => dispatch(closeDeleteFoldersComp())}
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                    />

                    <h1 className="text-[22px]">Delete Folders</h1>

                    {foldersOfCurrentFolder.length > 0 ? (
                        <div className="flex flex-col gap-y-3">
                            {foldersOfCurrentFolder.map(folder => (

                                <div key={folder.folderID} className="flex justify-between items-center">

                                    <p>{folder?.name}</p>

                                    <button
                                        onClick={() => handleDeleteFolder(folder)}
                                        className={`text-white rounded-md p-[5px] ${loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"}`}
                                        disabled={loading}
                                    >
                                        Delete Folder

                                    </button>

                                </div>

                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center text-[15px]">No Folders to show</h1>
                    )}

                </div>

            </div>
        </>
    );
}

export default DeleteFolders
