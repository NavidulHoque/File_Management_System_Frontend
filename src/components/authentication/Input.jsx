/* eslint-disable react/prop-types */

const Input = ({type, placeholder, value, handleChange, name, extraStyle}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            className={`border-black border-[2px] outline-none px-[5px] py-2 text-[18px] rounded-md ${extraStyle}`}
            value={value}
            onChange={handleChange}
            name={name}
        />
    )
}

export default Input
