import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from './components/mainNavbar/Navbar';
import { useSelector } from "react-redux";
import CreateFolder from "./components/dashboard/navbar/CreateFolder"
import CreateFile from "./components/dashboard/navbar/CreateFile.jsx"
import DeleteFiles from "./components/dashboard/navbar/DeleteFiles.jsx";
import DeleteFolders from "./components/dashboard/navbar/DeleteFolders.jsx";

const RootLayout = () => {
  const createFileCompState = useSelector((state) => state.OpenOfCreationAndDeletionComp.createFileCompState)

  const createFolderCompState = useSelector((state) => state.OpenOfCreationAndDeletionComp.createFolderCompState)

  const deleteFilesCompState = useSelector((state) => state.OpenOfCreationAndDeletionComp.deleteFilesCompState)

  const deleteFoldersCompState = useSelector((state) => state.OpenOfCreationAndDeletionComp.deleteFoldersCompState)


  return (
    <>
      <ToastContainer />
      <div className="min-h-screen relative">

        {createFileCompState && <CreateFile createFileCompState={createFileCompState} />}

        {createFolderCompState && <CreateFolder createFolderCompState={createFolderCompState} />}

        {deleteFilesCompState && <DeleteFiles deleteFilesCompState={deleteFilesCompState} />}

        {deleteFoldersCompState && <DeleteFolders deleteFoldersCompState={deleteFoldersCompState} />}

        <Navbar />
        <Outlet />

      </div>
    </>
  )
}

export default RootLayout
