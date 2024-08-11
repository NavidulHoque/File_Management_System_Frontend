import { Outlet } from "react-router-dom"
import DashboardNavbar from "../../components/dashboard/navbar/DashboardNavbar"
import { Helmet } from "react-helmet-async"

const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Folder</title>
      </Helmet>

      <div className="min-h-[85vh] pt-3">

        <DashboardNavbar />
        <Outlet />

      </div>
    </>
  )
}

export default DashboardLayout
