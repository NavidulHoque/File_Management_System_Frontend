/* eslint-disable react/prop-types */
import { RxCross2 } from 'react-icons/rx'

const CrossIcon = ({handleClick}) => {
    return (
        <RxCross2
            onClick={handleClick}
            className="absolute right-[10px] top-[10px] cursor-pointer"
        />
    )
}

export default CrossIcon
