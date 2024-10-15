/* eslint-disable react-hooks/exhaustive-deps */
import { Helmet } from "react-helmet-async"
import Animation from "../../components/home/Animation"
import { motion } from 'framer-motion';

const Home = () => {

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="md:h-[88vh] h-[75vh] bg-[#3498db] text-white flex flex-col justify-center items-center gap-y-6">

        <motion.p
          className="w-[85vw] mx-auto text-[40px] font-semibold text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          Welcome to File Management System
        </motion.p>

        <Animation />

      </div>
    </>
  )
}

export default Home
