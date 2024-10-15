import Lottie from "lottie-react";
import LoginAnimation from "../../animation/LoginAnimation.json";
import { Helmet } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../components/authentication/LoginForm";

const Login = () => {
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            
            <ToastContainer />

            <div className="flex justify-center items-center h-screen">

                <div className="flex flex-col md:flex-row gap-x-7 w-[700px]">

                    <div className="sm:w-[48%] w-[80%] self-center">

                        <Lottie animationData={LoginAnimation} loop={true} />

                    </div>

                    <div className="sm:w-[48%] w-[80%] flex items-center self-center">

                        <LoginForm />

                    </div>

                </div>

            </div>
        </>
    );
};

export default Login;
