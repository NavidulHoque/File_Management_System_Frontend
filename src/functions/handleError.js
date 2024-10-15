import { LogOut } from "../features/slices/userLoginSlice"
import errorToast from "./errorToast"

export default function handleError({setLoading, error, dispatch, navigate}) {
    setLoading(false)
    errorToast(error.message)

    if (error.message.toLowerCase().includes("token")) {

        dispatch(LogOut())
        navigate("/login")
    }
}