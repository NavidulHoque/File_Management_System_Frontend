/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import successToast from "../../../../functions/successToast";
import axios from "axios";
import { url } from "../../../../url";
import Button from "./Button";
import handleError from "../../../../functions/handleError";
import { useDispatch } from "react-redux";
import makeLoadingFalse from "../../../../functions/makeLoadingFalse";
import { useIsMounted } from "../../../../hooks/useIsMounted";

const FilePageNavbar = ({ file, fileData, setFile }) => {
  const { fileID } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const isMountedRef = useIsMounted()

  function handleGoBack() {
    if (file?.parent === "root") {
      navigate(`/dashboard`)
    }

    else {
      navigate(`/dashboard/folder/${file?.parent}`)
    }
  }

  async function handleSave() {

    try {
      setLoading(true)

      const response = await axios.put(url + `/file/${fileID}`, {
        data: fileData
      }, {
        withCredentials: true
      })

      if (response.data.status) {

        setFile(response.data.file)
        successToast(response.data.message)
      }

      else {
        throw new Error(response.data.message);
      }
    }

    catch (error) {

      handleError({ error, dispatch, navigate})
    }

    finally{
      makeLoadingFalse(isMountedRef.current, setLoading)
    }
  }

  return (
    <nav className="py-[15px]">

      <div className="w-[85vw] mx-auto flex justify-between items-center">

        <h2 
          className="font-semibold text-[22px] flex gap-x-2"
        >
          {file?.name} {(file?.data !== fileData) && <span className="text-red-500">*modified</span>}
        </h2>

        <div className="flex gap-x-3">

          <Button
            handleClick={handleSave}
            loading={loading}
            bgColor="bg-[#3498db]"
            bgColorHover="hover:bg-[#2980b9]"
          >
            <FaSave />Save
          </Button>

          <Button
            handleClick={handleGoBack}
            bgColor="bg-[#34495e]"
            bgColorHover="hover:bg-[#2c3e50]"
          >
            <IoMdArrowRoundBack />Go back
          </Button>

        </div>

      </div>

    </nav>
  )
}

export default FilePageNavbar
