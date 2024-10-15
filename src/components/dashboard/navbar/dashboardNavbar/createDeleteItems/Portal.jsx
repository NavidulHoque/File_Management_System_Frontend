/* eslint-disable react/prop-types */

const Portal = ({children}) => {
  return (
    <div className='flex justify-center bg-[rgba(0,0,0,0.4)] fixed w-full h-full top-0 z-10 pt-10'>
      {children}
    </div>
  )
}

export default Portal
