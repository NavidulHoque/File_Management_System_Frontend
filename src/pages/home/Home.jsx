import { useDispatch, useSelector } from "react-redux"
import { removeID } from "../../features/slices/setTimeOutSlice"
import { Helmet } from "react-helmet-async"

const Home = () => {
  const timeOutID = useSelector((state) => state.TimeOutID.timeOutID)
  const dispatch = useDispatch()

  clearTimeout(timeOutID)

  dispatch(removeID())

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="md:h-[88vh] h-[75vh] bg-[#3498db] text-white flex justify-center items-center">

        <p className="w-[85vw] mx-auto text-[40px] font-semibold text-center">Welcome to File Management System</p>

      </div>
    </>
  )
}

export default Home
