/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"

const RedirectButton = ({path, label}) => {
    return (
        <Link
            to={path}
            className="text-blue-600 hover:underline"
        >
            {label}
        </Link>
    )
}

export default RedirectButton
