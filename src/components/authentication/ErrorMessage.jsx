/* eslint-disable react/prop-types */

const ErrorMessage = ({ formik, name }) => {
    return (
        formik.errors[name] && formik.touched[name] && (
            <p className="text-red-500">{formik.errors[name]}</p>
        )
    )
}

export default ErrorMessage
