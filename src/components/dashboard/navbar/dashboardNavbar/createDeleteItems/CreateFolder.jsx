/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useState } from "react";
import errorToast from "../../../../../functions/errorToast";
import successToast from "../../../../../functions/successToast";
import useCurrentFolder from "../../../../../hooks/useCurrentFolder";
import useFolders from './../../../../../hooks/useFolders';
import { url } from "../../../../../url";
import Portal from "./Portal";
import ParentDiv from './ParentDiv';
import CrossIcon from "./CrossIcon";
import Heading from "./Heading";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import handleError from "../../../../../functions/handleError";


const CreateFolder = ({ setOpenCreateFolders }) => {
  const { currentFolder } = useCurrentFolder()
  const { setFolders } = useFolders()
  const user = useSelector((state) => state.UserLogin.user)
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  const handleAddFolder = useCallback(async () => {

    const trimmedFolderName = folderName.trim()

    if (!trimmedFolderName) {
      errorToast("Please enter a folder name")
    }

    else if (trimmedFolderName.length < 4) {

      errorToast("Folder name should be at least 4 characters long")
    }

    else if (trimmedFolderName.length > 15) {

      errorToast("Folder name cannot exceed 15 characters")
    }

    else {

      const folder = {
        name: trimmedFolderName,
        parent: currentFolder,
        userID: user.id
      }

      try {
        setLoading(true)

        const response = await axios.post(url + "/folder/create", folder, { withCredentials: true })

        if (response.data.status) {

          setFolderName("")
          setFolders(prevFolders => [...prevFolders, response.data.folder])
          setLoading(false)

          successToast(response.data.message)
        }

        else {
          throw new Error(response.data.message)
        }
      }

      catch (error) {
        setLoading(false)
        handleError({ error, dispatch, navigate })
      }
    }

  }, [currentFolder, user, folderName, dispatch, navigate, setFolders])


  return (

    <Portal>

      <ParentDiv extraStyle="h-[180px]">

        <CrossIcon handleClick={() => setOpenCreateFolders(false)} />

        <Heading label="Create Folder" />

        <Input
          value={folderName}
          handleChange={(e) => setFolderName(e.target.value)}
          placeholder="Folder name"
        />

        <Button
          loading={loading}
          label="create"
          handleClick={handleAddFolder}
          bgColor="bg-[#3498db]"
          bgColorHover="hover:bg-[#2980b9]"
        />

      </ParentDiv>

    </Portal>

  );
};

export default CreateFolder;
