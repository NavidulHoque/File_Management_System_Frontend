import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFolders from './../../hooks/useFolders';
import useFiles from './../../hooks/useFiles';
import getFolders from "../../functions/getFolders";
import getFiles from "../../functions/getFiles";
import RenderFoldersFiles from "../../components/dashboard/RenderFoldersFiles/RenderFoldersFiles";
import useCurrentFolder from "../../hooks/useCurrentFolder";
import { useIsMounted } from "../../hooks/useIsMounted";

const RootFolder = () => {

  const { folders, setFolders } = useFolders()
  const { files, setFiles } = useFiles()
  const isMountedRef = useIsMounted()
  const {setCurrentFolder} = useCurrentFolder()
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    setCurrentFolder("root")
  
    getFolders({ path: "/folder/foldersOfCurrentFolder/root", isMountedRef, setLoading, setFolders, dispatch, navigate })

    getFiles({ path: "/file/files/root", isMountedRef, setLoading, setFiles, dispatch, navigate })

  }, [dispatch, navigate, isMountedRef, setCurrentFolder, setFiles, setFolders])


  return (
    <div className="flex flex-col pt-6">

      <RenderFoldersFiles 
        loading={loading}
        folders={folders}
        files={files} 
      />

    </div>
  )
}

export default RootFolder
