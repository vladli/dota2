"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};
export default function Template({ children }: Props) {
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      initial={{ x: -10, opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
    >
      {children}
    </motion.div>
  );
}
