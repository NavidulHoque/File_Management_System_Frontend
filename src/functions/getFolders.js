import axios from "axios"
import { url } from "../url"
import errorToast from "./errorToast"
import { LogOut } from "../features/slices/userLoginSlice"

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
            errorToast(error.message)

            if (error.message.toLowerCase().includes("token")) {

                dispatch(LogOut())
                navigate("/login")
            }
        }
    }
}