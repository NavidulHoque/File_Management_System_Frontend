/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

const AskingToRedirect = ({ label, asking, path }) => {
    return (
        <p className="text-slate-500 space-x-2">

            <span>{asking}</span>

            <Link 
                to={path} 
                className="text-blue-600 underline"
            >
                {label}
            </Link>
            
        </p>
    )
}

export default AskingToRedirect
