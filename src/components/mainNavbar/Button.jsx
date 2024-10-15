/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const Button = ({ label, handleClick, bgColor, bgColorHover }) => {
    return (
        <motion.button
            onClick={handleClick}
            className={`rounded-md p-[10px] ${bgColor} ${bgColorHover}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{
                scale: 0.8,
                borderRadius: "100%"
            }}
        >
            {label}
        </motion.button>
    )
}

export default Button
