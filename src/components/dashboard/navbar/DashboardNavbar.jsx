import { FaFileAlt } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import Button from "./Button";
import { openCreateFileComp, openCreateFolderComp, openDeleteFilesComp, openDeleteFoldersComp } from "../../../features/slices/OpenOfCreationAndDeletionCompSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFolderDelete } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";

const DashboardNavbar = () => {
  const currentFolder = useSelector((state) => state.Folders.currentFolder)
  let traverse = currentFolder
  const folderLists = []
  const folders = useSelector((state) => state.Folders.folders)

  if (currentFolder !== "root") {

    for (let i = 0; i < folders.length; i++) {
      const folder = folders[i]

      if (folder.folderID === traverse) {
        folderLists.unshift({ name: folder.name, folderID: traverse })
        traverse = folder.parent
        i = -1;
      }

      if (traverse === "root") {
        break
      }
    }
  }

  return (
    <nav className="py-[10px]" aria-label="breadcrumb">

      <div className="flex md:flex-row flex-col gap-y-2 md:justify-between w-[90vw] mx-auto">

        <ol className="breadcrumb flex space-x-2">

          <li className="breadcrumb-item">

            {currentFolder !== "root" ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-blue-600 hover:underline"
                >
                  Root
                </Link>

                <span className="mx-2 text-gray-500">/</span>
              </>
            ) : (
              <span className="text-gray-500">Root</span>
            )}

          </li>

          {folderLists?.map((list, index) => (

            <li key={list.folderID} className="breadcrumb-item">

              {folderLists.length - 1 !== index ? (
                <>
                  <Link
                    to={`/dashboard/folder/${list.folderID}`}
                    className="text-blue-600 hover:underline"
                  >{list.name}</Link>

                  <span className="mx-2 text-gray-500">/</span>
                </>
              ) : (
                <span className="text-gray-500">{list.name}</span>
              )}

            </li>

          ))}

        </ol>

        <div className="flex gap-3 self-end">

          <div className="flex sm:flex-row flex-col gap-3">

            <Button handleOpen={openDeleteFilesComp}>
              <RiDeleteBinLine /> Delete File
            </Button>

            <Button handleOpen={openDeleteFoldersComp}>
              <MdFolderDelete /> Delete Folder
            </Button>

          </div>

          <div className="flex sm:flex-row flex-col gap-3">

            <Button handleOpen={openCreateFileComp}>
              <FaFileAlt /> Create File
            </Button>

            <Button handleOpen={openCreateFolderComp}>
              <MdCreateNewFolder /> Create Folder
            </Button>
            
          </div>

        </div>

      </div>

    </nav>
  );
};

export default DashboardNavbar;
