/* eslint-disable react/prop-types */

const Input = ({value, handleChange, placeholder}) => {
    return (
        <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className="border-black outline-none border-[2px] rounded-md px-[5px] py-[3px]"
            autoFocus
        />
    )
}

export default Input
