import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "../../features/slices/userLoginSlice";
import { useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { BeatLoader } from "react-spinners";
import { motion } from 'framer-motion';
import Button from "./Button";
import handleError from "../../functions/handleError";

const Navbar = () => {
  const user = useSelector((state) => state.UserLogin.user)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    setLoading(true)

    try {
      const response = await axios.get(url + "/auth/logout", { withCredentials: true })

      if (response.data.status) {
        dispatch(LogOut())
      }

      else {
        throw new Error(response.data.message)
      }
    }

    catch (error) {
      handleError({error})
    }

    finally{
      setLoading(false)
    }
  }

  return (
    <nav className="bg-[rgb(40,40,40)] text-white h-[25vh] md:h-[12vh]">

      <div className="w-[90vw] mx-auto flex md:flex-row flex-col items-center justify-center md:justify-between h-full gap-y-3">

        <motion.h1
          className="font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          File Management System
        </motion.h1>

        {user ? (

          <div className="flex sm:flex-row flex-col items-center sm:gap-x-3 gap-y-2 justify-center">

            <motion.p
              className="pr-[10px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >

              Hello <span className="text-amber-400">{user.username}</span>

            </motion.p>

            <div className="flex gap-x-3">

              {location.pathname === "/dashboard" ? (

                <Button
                  label="Home"
                  handleClick={() => navigate("/")}
                  bgColor="bg-[#9b59b6]"
                  bgColorHover="hover:bg-[#8e44ad]"
                />

              ) : (

                <Button
                  label="Dashboard"
                  handleClick={() => navigate("/dashboard")}
                  bgColor="bg-[#9b59b6]"
                  bgColorHover="hover:bg-[#8e44ad]"
                />

              )}

              <Button
                label={loading ? <BeatLoader color="#fff" size={5} /> : "Logout"}
                handleClick={handleLogOut}
                bgColor="bg-[#1abc9c]"
                bgColorHover="hover:bg-[#16a085]"
              />

            </div>

          </div>

        ) : (

          <div className="flex gap-x-3">

            <Button
              label="Login"
              handleClick={() => navigate("/login")}
              bgColor="bg-[#9b59b6]"
              bgColorHover="hover:bg-[#8e44ad]"
            />

            <Button
              label="Register"
              handleClick={() => navigate("/registration")}
              bgColor="bg-[#1abc9c]"
              bgColorHover="hover:bg-[#16a085]"
            />

          </div>

        )}

      </div>

    </nav>
  )
}

export default Navbar;
