/* eslint-disable no-unused-vars */
import Lottie from "lottie-react";
import RegAnimation from "../../animation/RegAnimation.json"
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet-async";
import RegistrationForm from "../../components/authentication/RegistrationForm";

const Registration = () => {
    return (
        <>
            <Helmet>
                <title>Registration</title>
            </Helmet>

            <ToastContainer />
            
            <div className="flex justify-center items-center h-screen">

                <div className="flex flex-col md:flex-row gap-x-7 w-[700px]">

                    <div className="sm:w-[48%] w-[80%] self-center">

                        <Lottie animationData={RegAnimation} loop={true} />

                    </div>

                    <div className="sm:w-[48%] w-[80%] flex items-center self-center">

                        <RegistrationForm />

                    </div>

                </div>

            </div>
        </>
    )
}

export default Registration
