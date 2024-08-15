/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { BeatLoader } from "react-spinners";
import collectionFiles from './../../../functions/collectionFiles';
import { addDoc } from "firebase/firestore";
import { validFileExtensions } from './../../../extensions/extensions';
import { addFile } from "../../../features/slices/fileSlice";
import { closeCreateFileComp } from "../../../features/slices/OpenOfCreationAndDeletionCompSlice";
import updatingChildrenFiles from "../../../functions/updatingChildrenFiles";

const CreateFile = ({ createFileCompState }) => {
  const { currentFolder, folders } = useSelector((state) => state.Folders)
  const { files } = useSelector((state) => state.Files)
  const user = useSelector((state) => state.UserLogin.user)
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const validExtensions = validFileExtensions

  async function handleAddFile() {

    const extensionExists = fileName.split(".").length > 1
    const extension = fileName.split(".")[1].trim()
    const trimmedFileName = fileName.trim()

    if (files.find(file => file.name === (extensionExists ? fileName.split(".").map(x => x.trim()).join(".") : trimmedFileName.concat(".txt")) && file.parent === currentFolder)) {

      toast.error("File already exists, please enter another name", {
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
    }

    //checks if the extension is valid or not
    else if (!validExtensions.includes(extension) && extensionExists) {

      toast.error("File extension invalid, please enter a valid file extension", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      })
    }

    else if (trimmedFileName.length > 3) {

      const fileInfo = {
        name: extensionExists ? fileName.split(".").map(x => x.trim()).join(".") : trimmedFileName.concat(".txt"),
        extension: extensionExists ? extension : "txt",
        parent: currentFolder,
        userID: user.id,
        savedDate: new Date().toString(),
        createdBy: user.displayName,
        data: "",
      }

      try {
        setLoading(true)
        const docRef = await addDoc(collectionFiles(), fileInfo)
        fileInfo.fileID = docRef.id

        await updatingChildrenFiles(fileInfo, folders, dispatch)

        dispatch(addFile(fileInfo))

        toast.success("File created", {
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
        setFileName("")
      }

      catch (error) {

        toast.error("File creation failed, please try again", {
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

    else if (trimmedFileName.length <= 3 && trimmedFileName.length > 0) {

      toast.error("File name should be greater than 3 characters", {
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
    }

    else if (!trimmedFileName) {

      toast.error("Please enter a file name", {
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
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`fixed w-full top-0 left-0 h-screen justify-center bg-[rgba(0,0,0,0.4)] pt-10 ${createFileCompState ? "flex z-10" : "hidden -z-10"
          }`}
      >
        <div className="basis-[400px] h-[180px] rounded-md bg-white flex flex-col gap-y-5 relative p-[15px]">

          <RxCross2
            onClick={() => dispatch(closeCreateFileComp())}
            className="absolute right-[10px] top-[10px] cursor-pointer"
          />

          <h1 className="text-[22px]">Create File</h1>

          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="File name Eg: index, index.txt, index.html etc"
            className="border-black outline-none border-[2px] rounded-md px-[5px] py-[3px]"
            autoFocus
          />

          <button
            onClick={handleAddFile}
            className="bg-[#3498db] hover:bg-[#2980b9] text-white rounded-md py-[5px] w-[100px]"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Create File"}

          </button>

        </div>

      </div>
    </>
  );
};

export default CreateFile;
