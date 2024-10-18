import FilePageNavbar from "../../components/dashboard/navbar/FilePageNavbar/FilePageNavbar"
import CodeEditor from "../../components/dashboard/editor/CodeEditor"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Helmet } from "react-helmet-async"
import axios from 'axios';
import { url } from '../../url';
import { ColorRing } from 'react-loader-spinner'
import handleError from "../../functions/handleError"


const File = () => {
  const { fileID } = useParams()
  const [fileData, setFileData] = useState("")
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {

    async function getFile() {

      try {
        const response = await axios.get(url + `/file/${fileID}`, { withCredentials: true })

        if (response.data.status) {

          setFile(response.data.file)
          setLoading(false)
          setFileData(response.data.file.data)
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

    getFile()

  }, [fileID, dispatch, navigate, setLoading])

  
  return (
    <>
      <Helmet>
        <title>Dashboard File</title>
      </Helmet>

      <div className="min-h-[85vh]">

        {loading ? (
          <div className='w-full flex justify-center items-center'>

            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />

          </div>
        ) : (
          <>
            <FilePageNavbar
              file={file}
              fileData={fileData}
              setFile={setFile}
            />

            <CodeEditor
              fileData={fileData}
              setFileData={setFileData}
              file={file}
            />
          </>
        )}

      </div>
    </>
  )
}

export default File
