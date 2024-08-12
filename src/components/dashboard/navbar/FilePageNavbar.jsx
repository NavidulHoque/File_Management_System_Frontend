/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../database/firebaseConfig";
import { Bounce, toast } from "react-toastify";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { updateFileData } from "../../../features/slices/fileSlice";
import { createSelector } from 'reselect';

const FilePageNavbar = ({ fileData }) => {
  const { fileID } = useParams()
  const file = useSelector(createSelector(
    [(state) => state.Files.files],
    (files) => files.find(file => file.fileID === fileID)
  ))
  const navigate = useNavigate()
  const currentFolder = useSelector(state => state.Folders.currentFolder)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  function handleGoBack() {
    if (currentFolder === "root") {
      navigate(`/dashboard`)
    }

    else{
      navigate(`/dashboard/folder/${currentFolder}`)
    }
    
  }

  async function handleSave() {

    try {
      setLoading(true)

      //updating in firebase
      const fileRef = doc(db, 'files', file.fileID);

      await updateDoc(fileRef, {
        data: fileData,
        savedDate: new Date().toString()
      })

      const updatedFile = {
        ...file,
        data: fileData,
        savedDate: new Date().toString()
      }

      dispatch(updateFileData(updatedFile))

      toast.success("File saved successfully", {
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

      toast.error("Failed to save the file, please try again", {
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

      setLoading(false)
    }
  }

  return (
    <nav className="py-[15px]">

      <div className="w-[85vw] mx-auto flex justify-between items-center">

        <h2 className="font-semibold text-[22px] flex gap-x-2">{file?.name} {(file?.data !== fileData) && <span className="text-red-500">*modified</span>}</h2>

        <div className="flex gap-x-3">

          <button
            onClick={handleSave}
            className="bg-[#3498db] hover:bg-[#2980b9] text-white flex items-center rounded-md p-[8px] gap-x-1"
            disabled={loading}
          >
            {loading ? <BeatLoader color="#fff" size={5} /> : <><FaSave />Save</>}

          </button>

          <button onClick={handleGoBack} className="bg-[#34495e] hover:bg-[#2c3e50] text-white flex items-center rounded-md p-[8px] gap-x-1"><IoMdArrowRoundBack />Go back</button>

        </div>

      </div>

    </nav>
  )
}

export default FilePageNavbar
