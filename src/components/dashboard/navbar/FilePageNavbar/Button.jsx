/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners"

const Button = ({handleClick, loading, bgColor, bgColorHover, children}) => {
    return (
        <button
            onClick={handleClick}
            className={`${bgColor} ${bgColorHover} text-white flex items-center rounded-md p-[8px] gap-x-1`}
            disabled={loading}
        >
            {loading ? <BeatLoader color="#fff" size={5} /> : children}

        </button>
    )
}

export default Button
