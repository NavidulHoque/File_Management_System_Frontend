/* eslint-disable react/prop-types */

import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import successToast from "../../../../../functions/successToast";
import errorToast from "../../../../../functions/errorToast";
import useCurrentFolder from "../../../../../hooks/useCurrentFolder";
import { validFileExtensions } from './../../../../../extensions/extensions';
import useFiles from './../../../../../hooks/useFiles';
import axios from 'axios';
import { url } from "../../../../../url";
import { useNavigate } from 'react-router-dom';
import Portal from "./Portal";
import ParentDiv from "./ParentDiv";
import CrossIcon from "./CrossIcon";
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import handleError from "../../../../../functions/handleError";
import makeLoadingFalse from "../../../../../functions/makeLoadingFalse";
import { useIsMounted } from "../../../../../hooks/useIsMounted";


const CreateFile = ({ setOpenCreateFiles }) => {
  const { currentFolder } = useCurrentFolder()
  const { setFiles } = useFiles()
  const isMountedRef = useIsMounted()
  const user = useSelector((state) => state.UserLogin.user)
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validExtensions = validFileExtensions


  const handleAddFile = useCallback(async () => {

    const trimmedFileName = fileName.trim()
    const [basename, extension] = trimmedFileName && trimmedFileName.split(".")
    const trimmedBasename = basename && basename.trim()
    const trimmedExtension = extension && extension.trim()

    if (!trimmedFileName) {

      errorToast("Please enter a file name")
    }

    else if (!validExtensions.includes(trimmedExtension) && trimmedExtension) {

      errorToast("File extension invalid, please enter a valid file extension")
    }

    else if (trimmedBasename.length < 4) {

      errorToast("File's base name should be at least 4 characters")
    }

    else if (trimmedBasename.length > 10) {

      errorToast("File's base name cannot exceed 10 characters")
    }

    else {

      const file = {
        extension: trimmedExtension ? trimmedExtension : "txt",
        basename: trimmedBasename,
        fullname: trimmedExtension ? `${trimmedBasename + "." + trimmedExtension}` : `${trimmedBasename}.txt`,
        parent: currentFolder,
        userID: user.id
      }

      try {
        setLoading(true)

        const response = await axios.post(url + '/file/create', file, { withCredentials: true })

        if (response.data.status) {

          setFiles(prevFiles => [...prevFiles, response.data.file])
          setFileName("")

          successToast(response.data.message)
        }

        else {
          throw new Error(response.data.message)
        }
      }

      catch (error) {

        handleError({ error, dispatch, navigate })
      }

      finally {
        makeLoadingFalse(isMountedRef.current, setLoading)
      }
    }

  }, [currentFolder, fileName, user, dispatch, isMountedRef, navigate, setFiles, validExtensions])

  return (
    <>
      <Portal>

        <ParentDiv extraStyle="h-[180px]">

          <CrossIcon handleClick={() => setOpenCreateFiles(false)} />

          <Heading label="Create File" />

          <Input
            value={fileName}
            handleChange={(e) => setFileName(e.target.value)}
            placeholder="File name Eg: index, index.txt, index.html etc"
          />

          <Button
            loading={loading}
            label="create"
            handleClick={handleAddFile}
            bgColor="bg-[#3498db]"
            bgColorHover="hover:bg-[#2980b9]"
          />

        </ParentDiv>

      </Portal>
    </>
  );
};

export default CreateFile;
