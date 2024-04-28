"use client";
import { motion } from "framer-motion";
interface IButtonProps {
  className?: string;
  onClick?: any;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode | string;
}
const Button = ({
  className,
  type = "button",
  onClick,
  children,
}: IButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      type={type}
      className={`${className} rounded-xl px-10 bg-cs_primary_yellow w-[250px] h-[75px] text-white font-bold text-3xl`}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;
