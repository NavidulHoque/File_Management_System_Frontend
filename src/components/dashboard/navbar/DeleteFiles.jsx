/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { closeDeleteFilesComp } from "../../../features/slices/OpenOfCreationAndDeletionCompSlice";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import { deleteFile} from "../../../features/slices/fileSlice";
import deletionOfFileInAncestors from "../../../functions/deletionOfFileInAncestors";
import { selectFilesOfCurrentFolder } from "../../../memoization/selectFilesAndFoldersOfCurrentFolder";

const DeleteFiles = ({ deleteFilesCompState }) => {
    const folders = useSelector((state) => state.Folders.folders)
    const filesOfCurrentFolder = useSelector(selectFilesOfCurrentFolder)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    async function handleDeleteFile(file) {

        try {
            setLoading(true)
            await deleteDoc(doc(db, "files", file.fileID));

            await deletionOfFileInAncestors(file, folders, dispatch)

            dispatch(deleteFile(file.fileID))

            toast.success("File deleted successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })

            setLoading(false)
        }

        catch (error) {

            toast.error("File deletion failed, please try again", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            })

            setLoading(false)
        }

    }

    return (
        <>
            <ToastContainer />
            <div
                className={`fixed w-full top-0 left-0 h-screen justify-center bg-[rgba(0,0,0,0.4)] py-10 ${deleteFilesCompState ? "flex z-10" : "hidden -z-10"
                    }`}
            >
                <div className="basis-[400px] rounded-md bg-white flex flex-col gap-y-5 relative p-[15px] overflow-y-auto">

                    <RxCross2
                        onClick={() => dispatch(closeDeleteFilesComp())}
                        className="absolute right-[10px] top-[10px] cursor-pointer"
                    />

                    <h1 className="text-[22px]">Delete Files</h1>

                    {filesOfCurrentFolder.length > 0 ? (
                        <div className="flex flex-col gap-y-3">
                            {filesOfCurrentFolder.map(file => (

                                <div key={file.fileID} className="flex justify-between items-center">

                                    <p>{file?.name}</p>

                                    <button
                                        onClick={() => handleDeleteFile(file)}
                                        className={`text-white rounded-md py-[5px] w-[100px] ${loading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"}`}
                                        disabled={loading}
                                    >
                                        Delete File

                                    </button>

                                </div>

                            ))}
                        </div>
                    ) : (
                        <h1 className="text-center text-[15px]">No Files to show</h1>
                    )}

                </div>

            </div>
        </>
    );
}

export default DeleteFiles
