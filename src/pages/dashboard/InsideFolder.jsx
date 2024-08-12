/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import ShowItems from "../../components/dashboard/showCreatedFilesAndFolders/ShowItems"
import { changeCurrentFolder, fetchFolders } from "../../features/slices/folderSlice"
import { fetchFiles } from "../../features/slices/fileSlice"
import { selectFilesOfCurrentFolder, selectFoldersOfCurrentFolder } from "../../memoization/selectFilesAndFoldersOfCurrentFolder"

const InsideFolder = () => {
  const { folderID } = useParams()
  const dispatch = useDispatch()
  const folders = useSelector(selectFoldersOfCurrentFolder)
  const files = useSelector(selectFilesOfCurrentFolder)
  const isLoadingFolders = useSelector(state => state.Folders.isLoading)
  const isLoadingFiles = useSelector(state => state.Files.isLoading)
  const isErrorLoadingFolders = useSelector(state => state.Folders.isError)
  const isErrorLoadingFiles = useSelector(state => state.Files.isError)

  useEffect(() => {

    dispatch(changeCurrentFolder(folderID))

    dispatch(fetchFolders())
    dispatch(fetchFiles())
  
  }, [folderID])

  if (isLoadingFiles || isLoadingFolders) {
    return <h1 className="text-[24px] pt-6 text-center">Loading Folders and Files.....</h1>
  }
  
  else{

    return (
      <div className="flex flex-col pt-6">
  
        {(folders.length === 0 && files.length === 0) && <p className="text-[24px] text-center">This folder is empty</p>}
  
        {(folders.length > 0 && !isErrorLoadingFolders) ? <ShowItems title="Created Folders" items={folders} /> 
        
        : (folders.length === 0) ? '' 

        : <h1 className="text-[24px] pt-6 text-center">There are some errors to load the folders, please reload the page to solve the issue</h1>}

        {(files.length > 0 && !isErrorLoadingFiles) ? <ShowItems title="Created Files" items={files} /> 

        : (files.length === 0) ? '' 
        
        : <h1 className="text-[24px] pt-6 text-center">There are some errors to load the files, please reload the page to solve the issue</h1>}
  
      </div>
    )

  }
}

export default InsideFolder
