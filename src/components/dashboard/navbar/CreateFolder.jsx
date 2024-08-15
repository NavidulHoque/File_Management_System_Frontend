/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { addDoc } from "firebase/firestore";
import { BeatLoader } from "react-spinners";
import collectionFolders from "./../../../functions/collectionFolders";
import { addFolder } from "../../../features/slices/folderSlice";
import { closeCreateFolderComp } from "../../../features/slices/OpenOfCreationAndDeletionCompSlice"
import updatingChildrenFolders from "../../../functions/updatingChildrenFolders";

const CreateFolder = ({ createFolderCompState }) => {
  const { currentFolder, folders } = useSelector(
    (state) => state.Folders
  )
  const user = useSelector((state) => state.UserLogin.user);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleAddFolder() {

    const trimmedFolderName = folderName.trim()

    if (folders.find((folder) => folder.name === trimmedFolderName && folder.parent === currentFolder)) {

      toast.error("Folder already exists, please enter another name", {
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

    else if (trimmedFolderName.length > 3) {

      const folderInfo = {
        name: trimmedFolderName,
        parent: currentFolder,
        userID: user.id,
        savedDate: new Date().toString(),
        createdBy: user.displayName,
        childrenFolders: [],
        childrenFiles: []
      };

      try {
        setLoading(true)

        const docRef = await addDoc(collectionFolders(), folderInfo);
        folderInfo.folderID = docRef.id

        await updatingChildrenFolders(folderInfo, folders, dispatch)

        dispatch(addFolder(folderInfo))

        toast.success("Folder created", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setLoading(false)
        setFolderName("")
      }

      catch (error) {
        toast.error("Folder creation failed, please try again", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        setLoading(false);
      }
    }

    else if (trimmedFolderName.length <= 3 && trimmedFolderName.length > 0) {
      toast.error("Folder name should be greater than 3 characters", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });

    }

    else if (!trimmedFolderName) {
      toast.error("Please enter a folder name", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  return (
    <>
      <ToastContainer />
      <div
        className={`fixed w-full top-0 left-0 h-screen justify-center bg-[rgba(0,0,0,0.4)] pt-10 ${createFolderCompState ? "flex z-10" : "hidden -z-10"
          }`}
      >
        <div className="basis-[400px] h-[180px] rounded-md bg-white flex flex-col gap-y-5 relative p-[15px]">
          <RxCross2
            onClick={() => dispatch(closeCreateFolderComp())}
            className="absolute right-[10px] top-[10px] cursor-pointer"
          />

          <h1 className="text-[22px]">Create Folder</h1>

          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            className="border-black outline-none border-[2px] rounded-md px-[5px] py-[3px]"
            autoFocus
          />

          <button
            onClick={handleAddFolder}
            className="bg-[#3498db] hover:bg-[#2980b9] text-white rounded-md py-[5px] w-[120px]"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : "Create Folder"}
          </button>

        </div>

      </div>
    </>
  );
};

export default CreateFolder;
