import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { LogOut } from "../../features/slices/userLoginSlice";
import errorToast from "../../functions/errorToast";

const Navbar = () => {
  const user = useSelector((state) => state.UserLogin.user);
  const dispatch = useDispatch();
  const auth = getAuth();
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogOut() {
    signOut(auth)
      .then(() => {

        dispatch(LogOut())
        navigate("/")

      })
      .catch(() => {

        errorToast("Something went wrong, please try again")
      })
  }

  return (
    <nav className="bg-[rgb(40,40,40)] text-white h-[25vh] md:h-[12vh]">

      <div className="w-[90vw] mx-auto flex md:flex-row flex-col items-center justify-center md:justify-between h-full gap-y-3">

        <h1 className="font-semibold text-[24px]">File Management System</h1>

        {user ? (

          <div className="flex sm:flex-row flex-col items-center sm:gap-x-3 gap-y-2 justify-center">

            <p className="text-[20px] pr-[10px]">

              Hello <span className="text-amber-400">{user.displayName}</span>

            </p>

            <div className="flex gap-x-3">

              {location.pathname === "/dashboard" ? (

                <Link
                  to="/"
                  className="rounded-md p-[10px] bg-[#9b59b6] hover:bg-[#8e44ad]"
                >
                  Home
                </Link>

              ) : (

                <Link
                  to="/dashboard"
                  className="rounded-md p-[10px] bg-[#9b59b6] hover:bg-[#8e44ad]"
                >
                  Dashboard
                </Link>

              )}

              <button
                onClick={handleLogOut}
                className="rounded-md p-[10px] bg-[#1abc9c] hover:bg-[#16a085]"
              >
                Log Out
              </button>

            </div>

          </div>

        ) : (

          <div className="flex gap-x-3">

            <Link
              to="/login"
              className="rounded-md p-[10px] bg-[#9b59b6] hover:bg-[#8e44ad]"
            >
              Login
            </Link>

            <Link
              to="/registration"
              className="rounded-md p-[10px] bg-[#1abc9c] hover:bg-[#16a085]"
            >
              Register
            </Link>

          </div>

        )}

      </div>

    </nav>
  )
}

export default Navbar;
