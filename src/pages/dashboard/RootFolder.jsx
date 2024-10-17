import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFolders from './../../hooks/useFolders';
import useFiles from './../../hooks/useFiles';
import getFolders from "../../functions/getFolders";
import getFiles from "../../functions/getFiles";
import RenderFoldersFiles from "../../components/dashboard/RenderFoldersFiles/RenderFoldersFiles";
import useCurrentFolder from "../../hooks/useCurrentFolder";


const RootFolder = () => {

  const { folders, setFolders } = useFolders()
  const { files, setFiles } = useFiles()
  const {setCurrentFolder} = useCurrentFolder()
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.UserLogin.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  useEffect(() => {

    setCurrentFolder("root")
  
    getFolders({ path: `/folder/foldersOfCurrentFolder/root/${user.id}`, setLoading, setFolders, dispatch, navigate })

    getFiles({ path: `/file/files/root/${user.id}`, setLoading, setFiles, dispatch, navigate })

  }, [user, dispatch, navigate, setCurrentFolder, setFiles, setFolders, setLoading])


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
