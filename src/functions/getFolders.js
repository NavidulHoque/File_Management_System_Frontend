import axios from "axios"
import { url } from "../url"
import handleError from "./handleError"

export default async function getFolders({path, setLoading, setFoldersOfCurrentFolder, dispatch, navigate}) {

    try {
        const response = await axios.get(url + path, { withCredentials: true })

        if (response.data.status) {

            setLoading(false)
            setFoldersOfCurrentFolder(response.data.folders)
        }

        else {
            throw new Error(response.data.message)
        }
    }

    catch (error) {

        setLoading(false)

        if (error.message === "empty") {
            setFoldersOfCurrentFolder([])
        }

        else {
            handleError({error, dispatch, navigate})
        }
    }
}