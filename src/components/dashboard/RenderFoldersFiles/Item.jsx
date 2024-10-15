/* eslint-disable react/prop-types */
import { formatDistance } from "date-fns";
import { FaFolder } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Item = ({item, title}) => {
  const navigate = useNavigate()

  function handleRedirect() {
    
    if (title === "Folders") {
      navigate(`/dashboard/folder/${item.id}`)
    }
    else{
      navigate(`/dashboard/file/${item.id}`)
    }
  }

  return (
    <div 
      onClick={handleRedirect} 
      className="flex flex-col items-center gap-y-2 hover:bg-blue-200 w-[180px] border-[1px] border-[rgb(0,0,0,0.2)] py-[20px] rounded-md cursor-pointer"
    >
       
       {title === "Folders" ? <FaFolder className="text-[70px]" /> : <FaFileAlt className="text-[70px]" />}

       <span>{item?.name}</span>

       <span className="text-[16px] text-slate-400">{formatDistance(item?.updatedAt, new Date(), { addSuffix: true })}</span>

    </div>
  )
}

export default Item
