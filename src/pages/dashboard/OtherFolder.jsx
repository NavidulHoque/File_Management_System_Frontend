import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import useFolders from "../../hooks/useFolders"
import useFiles from "../../hooks/useFiles"
import getFolders from "../../functions/getFolders"
import getFiles from "../../functions/getFiles"
import RenderFoldersFiles from "../../components/dashboard/RenderFoldersFiles/RenderFoldersFiles"
import useCurrentFolder from "../../hooks/useCurrentFolder"


const OtherFolder = () => {
  const { folderID } = useParams()
  const { foldersOfCurrentFolder, setFoldersOfCurrentFolder } = useFolders()
  const { filesOfCurrentFolder, setFilesOfCurrentFolder } = useFiles()
  const {setCurrentFolder} = useCurrentFolder()
  const [loading, setLoading] = useState(true)
  const user = useSelector(state => state.UserLogin.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    setCurrentFolder(folderID)

    getFolders({ path: `/folder/foldersOfCurrentFolder/${folderID}/${user.id}`, setLoading, setFoldersOfCurrentFolder, dispatch, navigate })
    
    getFiles({ path: `/file/files/${folderID}/${user.id}`, setLoading, setFilesOfCurrentFolder, dispatch, navigate })

  }, [folderID, user, dispatch, navigate, setCurrentFolder, setFoldersOfCurrentFolder, setFilesOfCurrentFolder, setLoading])

  return (
    <div className="flex flex-col pt-6">

      <RenderFoldersFiles
        loading={loading}
        folders={foldersOfCurrentFolder}
        files={filesOfCurrentFolder}
      />

    </div>
  )
}

export default OtherFolder
