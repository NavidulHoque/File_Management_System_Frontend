/* eslint-disable react/prop-types */
import { BeatLoader } from "react-spinners"

const Button = ({ loading, label, handleClick, bgColor, bgColorHover, bgColorDisabled }) => {
    return (
        <button
            onClick={handleClick}
            className={`${bgColor} ${bgColorHover} ${bgColorDisabled}  text-white rounded-md py-[5px] w-[120px]`} 
            disabled={loading}
        >
            {loading ? <BeatLoader color="#fff" size={5} /> : label}

        </button>
    )
}

export default Button
