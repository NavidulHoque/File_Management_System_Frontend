import { LogOut } from "../features/slices/userLoginSlice"
import errorToast from "./errorToast"

export default function handleError({ error, dispatch, navigate}) {
    errorToast(error.message)

    if (error.message.toLowerCase().includes("token")) {

        dispatch(LogOut())
        navigate("/login")
    }
}