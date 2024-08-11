import { createBrowserRouter, createRoutesFromChildren, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./RootLayout"
import Login from './pages/authentication/Login';
import Registration from './pages/authentication/Registration';
import Home from './pages/home/Home';
import LoggedInPages from "./PrivateRoute/LoggedInPages";
import LoggedOutPages from "./PrivateRoute/LoggedOutPages";
import PasswordReset from "./pages/authentication/PasswordReset";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import InsideFolder from "./pages/dashboard/InsideFolder";
import RootFolder from "./pages/dashboard/RootFolder";
import InsideFile from "./pages/dashboard/InsideFile";

const App = () => {
  const router = createBrowserRouter(createRoutesFromChildren(
    <Route>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />}></Route>

        <Route element={<LoggedInPages />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard" element={<RootFolder />}></Route>
            <Route path="/dashboard/folder/:folderID" element={<InsideFolder />}></Route>
          </Route>
          <Route path="/dashboard/file/:fileID" element={<InsideFile />}></Route>
        </Route>

      </Route>

      <Route element={<LoggedOutPages />}>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/passwordReset" element={<PasswordReset />}></Route>
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
