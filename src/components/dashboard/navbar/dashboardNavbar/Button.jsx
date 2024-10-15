/* eslint-disable react/prop-types */

const Button = ({children, handleClick}) => {
  
  return (
    <button 
      onClick={handleClick} 
      className="flex items-center gap-x-2 text-black hover:bg-black hover:text-white border-[1px] border-black rounded-md px-[8px] py-[5px] transition-all duration-200"
    >
      {children}
    </button>
  )
}

export default Button
