import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Navbar from './components/mainNavbar/Navbar';

const RootLayout = () => {
  
  return (
    <>
      <ToastContainer />
      
      <div className="min-h-screen relative text-[18px] md:text-xl lg:text-2xl">

        <Navbar />
        <Outlet />

      </div>
    </>
  )
}

export default RootLayout
