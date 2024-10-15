/* eslint-disable react/prop-types */

import { BeatLoader } from "react-spinners"

const Button = ({ loading, label }) => {
    return (
        <button
            type="submit"
            className="hover:bg-black bg-[rgb(50,50,50)] text-white rounded-md py-2 w-full"
            disabled={loading}
        >
            {loading ? <BeatLoader color="#fff" size={5} /> : label}
        </button>
    )
}

export default Button
