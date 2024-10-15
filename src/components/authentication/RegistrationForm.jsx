/* eslint-disable react/prop-types */
import { useFormik } from "formik";
import { signUp } from "../../validation/validation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import successToast from '../../functions/successToast';
import axios from "axios";
import { url } from "../../url";
import Form from "./Form";
import Heading from "./Heading";
import Input from "./Input";
import ErrorMessage from "./ErrorMessage";
import Button from "./Button";
import AskingToRedirect from "./AskingToRedirect";
import handleError from "../../functions/handleError";

const RegistrationForm = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: () => createNewUser(),
    validationSchema: signUp,
  });

  const createNewUser = async () => {
    setLoading(true);

    try {

      const response = await axios.post(url + "/auth/registration", {
        username: formik.values.username,
        email: formik.values.email,
        password: formik.values.password
      })

      if (response.data.status) {

        setLoading(false)

        formik.resetForm()

        successToast(response.data.message)

        const timeOutID = setTimeout(() => {
          navigate("/login")
        }, 2000)

        return () => clearTimeout(timeOutID)
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
    <Form handleSubmit={formik.handleSubmit}>

      <Heading label="Create an Account" />

      <Input
        type="text"
        placeholder="enter your name"
        value={formik.values.username}
        handleChange={formik.handleChange}
        name="username"
      />

      <ErrorMessage
        formik={formik}
        name="username"
      />

      <Input
        type="email"
        placeholder="enter your email"
        value={formik.values.email}
        handleChange={formik.handleChange}
        name="email"
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
      />

      <ErrorMessage
        formik={formik}
        name="password"
      />

      <Button
        loading={loading}
        label="Sign Up"
      />

      <AskingToRedirect
        asking="Already signed up?"
        label="Sign In"
        path="/login"
      />

    </Form>
  );
}

export default RegistrationForm
