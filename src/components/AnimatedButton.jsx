import { motion } from "motion/react";

const AnimatedButton = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <motion.button
      disabled={disabled}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.9, y: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className={className}
      onClick={onClick}
      type={type}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;
