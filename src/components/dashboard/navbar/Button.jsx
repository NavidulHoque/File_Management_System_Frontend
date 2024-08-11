/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"

const Button = ({children, handleOpen}) => {
  const dispatch = useDispatch()
  
  return (
    <button onClick={() => dispatch(handleOpen())} className="border-[1px] border-black rounded-md px-[8px] py-[5px] text-black hover:bg-black hover:text-white transition-all duration-200 flex items-center gap-x-2">{children}</button>
  )
}

export default Button
