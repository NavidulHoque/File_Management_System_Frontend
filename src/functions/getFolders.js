import axios from "axios"
import { url } from "../url"
import handleError from "./handleError"

export default async function getFolders({path, setLoading, setFolders, dispatch, navigate}) {

    try {
        const response = await axios.get(url + path, { withCredentials: true })

        if (response.data.status) {

            setLoading(false)
            setFolders(response.data.folders)
        }

        else {
            throw new Error(response.data.message)
        }
    }

    catch (error) {

        setLoading(false)

        if (error.message === "empty") {
            setFolders([])
        }

        else {
            handleError({error, dispatch, navigate})
        }
    }
}