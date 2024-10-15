import { Outlet } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import AllProvider from "../../AllProvider"
import DashboardNavbar from './../../components/dashboard/navbar/dashboardNavbar/DashboardNavbar';

const DashboardLayout = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard Folder</title>
      </Helmet>

      <AllProvider>

        <div className="min-h-[85vh] pt-3">

          <DashboardNavbar />
          <Outlet />

        </div>

      </AllProvider>
    </>
  )
}

export default DashboardLayout
