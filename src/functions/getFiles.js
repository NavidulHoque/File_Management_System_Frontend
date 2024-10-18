import axios from "axios"
import { url } from "../url"
import handleError from './handleError';

export default async function getFiles({ path, setLoading, setFilesOfCurrentFolder, dispatch, navigate }) {

  try {
    const response = await axios.get(url + path, { withCredentials: true })

    if (response.data.status) {

      setLoading(false)
      setFilesOfCurrentFolder(response.data.files)
    }

    else {
      throw new Error(response.data.message)
    }
  }

  catch (error) {

    setLoading(false)

    if (error.message === "empty") {
      setFilesOfCurrentFolder([])
    }

    else {

      handleError({error, dispatch, navigate})
    }
  }
}