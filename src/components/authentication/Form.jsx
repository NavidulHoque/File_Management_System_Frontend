/* eslint-disable react/prop-types */

const Form = ({children, handleSubmit, extraStyle}) => {
  return (
    <form 
        onSubmit={handleSubmit} 
        className={`flex flex-col gap-y-4 w-full font-robotoRegular ${extraStyle}`}
    >
      {children}
    </form>
  )
}

export default Form
