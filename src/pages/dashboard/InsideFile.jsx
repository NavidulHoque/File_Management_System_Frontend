import FilePageNavbar from "../../components/dashboard/navbar/FilePageNavbar"
import CodeEditor from "../../components/dashboard/editor/CodeEditor"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import { fetchFiles } from "../../features/slices/fileSlice"
import { fetchFolders } from "../../features/slices/folderSlice"
import { Helmet } from "react-helmet-async"

const InsideFile = () => {
  const { fileID } = useParams()
  const file = useSelector(state => state.Files.files.find(file => file.fileID === fileID))
  const [fileData, setFileData] = useState("")
  const dispatch = useDispatch()
  const isLoadingFiles = useSelector(state => state.Files.isLoading)
  const isErrorLoadingFiles = useSelector(state => state.Files.isError)

  useEffect(() => {

    setFileData(file?.data)

  }, [file])


  useEffect(() => {

    dispatch(fetchFiles())
    dispatch(fetchFolders())

  }, [dispatch])

  if (isLoadingFiles) {
    return <h1 className="text-[24px] pt-6 text-center">Loading File.....</h1>
  }

  else if (isErrorLoadingFiles) {
    return <h1 className="text-[24px] pt-6 text-center">Something went wrong, please reload the page</h1>
  }

  else {

    return (
      <>
        <Helmet>
          <title>Dashboard File</title>
        </Helmet>

        <ToastContainer />

        <div className="min-h-[85vh]">

          <FilePageNavbar fileData={fileData} />

          <CodeEditor fileData={fileData} setFileData={setFileData} />

        </div>
      </>
    )

  }


}

export default InsideFile
