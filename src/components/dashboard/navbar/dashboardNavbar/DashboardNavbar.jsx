import { FaFileAlt } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { MdFolderDelete } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import useCurrentFolder from "../../../../hooks/useCurrentFolder";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import CreateFolder from "./createDeleteItems/CreateFolder";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../../../url";
import RenderBreadcrumb from "./RenderBreadcrumb";
import DeleteFolders from './createDeleteItems/DeleteFolders';
import DeleteFiles from './createDeleteItems/DeleteFiles';
import CreateFile from './createDeleteItems/CreateFile';
import handleError from "../../../../functions/handleError";


const DashboardNavbar = () => {
  const { folderID } = useParams()

  const { currentFolder } = useCurrentFolder()

  const [foldersOfLoggedInUser, setFoldersOfLoggedInUser] = useState([])

  const [openCreateFiles, setOpenCreateFiles] = useState(false)

  const [openCreateFolders, setOpenCreateFolders] = useState(false)

  const [openDeleteFiles, setOpenDeleteFiles] = useState(false)

  const [openDeleteFolders, setOpenDeleteFolders] = useState(false)

  const [folderLists, setFolderLists] = useState([])

  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.UserLogin.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    setFolderLists([])

  }, [folderID, setFolderLists])

  useEffect(() => {

    async function getFolders() {

      const path = `/folder/foldersOfLoggedInUser/${user.id}`
      setLoading(true)

      try {
        const response = await axios.get(url + path, { withCredentials: true })

        if (response.data.status) {
          setLoading(false)
          setFoldersOfLoggedInUser(response.data.folders)
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

    if (currentFolder !== "root") {
      getFolders()
    }

  }, [currentFolder, user, dispatch, navigate])


  useEffect(() => {

    if (currentFolder !== "root") {

      let traverse = currentFolder
      const length = foldersOfLoggedInUser.length
      const lists = []

      for (let i = 0; i < length; i++) {

        const folder = foldersOfLoggedInUser[i]

        if (folder.id === traverse) {

          lists.unshift({ id: traverse, name: folder.name })

          traverse = folder.parent
          i = -1
        }

        if (traverse === "root") {
          setFolderLists(lists)
          break
        }
      }
    }

  }, [foldersOfLoggedInUser, currentFolder])


  return (
    <>
      <nav className="py-[10px]">

        <div className="w-[90vw] mx-auto flex lg:flex-row flex-col md:justify-between gap-y-2">

          <ol className="flex space-x-2">

            <RenderBreadcrumb
              loading={loading}
              currentFolder={currentFolder}
              folderLists={folderLists}
            />

          </ol>

          <div className="flex gap-3 self-end">

            <div className="flex sm:flex-row flex-col gap-3">

              <Button handleClick={() => setOpenDeleteFiles(true)}>
                <RiDeleteBinLine /> Delete File
              </Button>

              <Button handleClick={() => setOpenDeleteFolders(true)}>
                <MdFolderDelete /> Delete Folder
              </Button>

            </div>

            <div className="flex sm:flex-row flex-col gap-3">

              <Button handleClick={() => setOpenCreateFiles(true)}>
                <FaFileAlt /> Create File
              </Button>

              <Button handleClick={() => setOpenCreateFolders(true)}>
                <MdCreateNewFolder /> Create Folder
              </Button>

            </div>

          </div>

        </div>

      </nav>

      {openCreateFiles && createPortal(
        <CreateFile
          setOpenCreateFiles={setOpenCreateFiles}
        />, document.body)}

      {openCreateFolders && createPortal(
        <CreateFolder
          setOpenCreateFolders={setOpenCreateFolders}
        />, document.body)}

      {openDeleteFiles && createPortal(
        <DeleteFiles
          setOpenDeleteFiles={setOpenDeleteFiles}
        />, document.body)}

      {openDeleteFolders && createPortal(
        <DeleteFolders
          setOpenDeleteFolders={setOpenDeleteFolders}
        />, document.body)}
    </>
  );
};

export default DashboardNavbar;
