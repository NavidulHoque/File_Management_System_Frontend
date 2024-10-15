import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Home from './pages/home/Home';
import LoggedInPages from "./PrivateRoute/LoggedInPages";
import LoggedOutPages from "./PrivateRoute/LoggedOutPages";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import RootFolder from "./pages/dashboard/RootFolder";
import OtherFolder from "./pages/dashboard/OtherFolder";
import File from "./pages/dashboard/File";

const App = () => {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route>

      <Route element={<RootLayout />}>

        <Route path="/" element={<Home />}></Route>

        <Route element={<LoggedInPages />}>

          <Route path="/dashboard" element={<DashboardLayout />}>

            <Route path="/dashboard" element={<RootFolder />}></Route>

            <Route path="/dashboard/folder/:folderID" element={<OtherFolder />}></Route>

          </Route>

          <Route path="/dashboard/file/:fileID" element={<File />}></Route>

        </Route>

      </Route>

      <Route element={<LoggedOutPages />}>

        <Route path="/login" element={<Login />}></Route>

        <Route path="/registration" element={<Registration />}></Route>

      </Route>

    </Route>
  ))
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
