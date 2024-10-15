/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { signIn } from "../../validation/validation";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LogIn } from "../../features/slices/userLoginSlice";
import axios from "axios"
import { url } from '../../url';
import Form from './Form';
import Heading from './Heading';
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import AskingToRedirect from "./AskingToRedirect";
import handleError from "../../functions/handleError";

const LoginForm = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => signInCurrentUser(),
    validationSchema: signIn,
  });

  const signInCurrentUser = async () => {
    setLoading(true)

    try {

      const response = await axios.post(url + "/auth/login", {
        email: formik.values.email,
        password: formik.values.password
      }, { withCredentials: true })

      if (response.data.status) {

        dispatch(LogIn(response.data.loggedInUser))

        setLoading(false)

        navigate("/")
      }

      else {
        throw new Error(response.data.message)
      }
    }

    catch (error) {
      handleError({setLoading, error})
    }
  }

  return (
    <Form
      handleSubmit={formik.handleSubmit}
      extraStyle="items-start"
    >
      <Heading label="Sign In and Explore the System" />

      <Input
        type="email"
        placeholder="enter your email"
        value={formik.values.email}
        handleChange={formik.handleChange}
        name="email"
        extraStyle="w-full"
      />

      <ErrorMessage
        formik={formik}
        name="email"
      />

      <Input
        type="password"
        placeholder="enter your password"
        value={formik.values.password}
        handleChange={formik.handleChange}
        name="password"
        extraStyle="w-full"
      />

      <ErrorMessage
        formik={formik}
        name="password"
      />

      <Button 
        loading={loading}
        label="Login"
      />

      <AskingToRedirect 
        asking="Don't have an account?" 
        label="Sign Up"
        path="/registration"
      />

    </Form>
  )
}

export default LoginForm
