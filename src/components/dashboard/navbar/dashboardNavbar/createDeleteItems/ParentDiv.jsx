/* eslint-disable react/prop-types */

const ParentDiv = ({children, extraStyle}) => {
  return (
    <div className={`basis-[400px] rounded-md bg-white flex flex-col gap-y-5 relative p-[15px] ${extraStyle}`}>
      {children}
    </div>
  )
}

export default ParentDiv
