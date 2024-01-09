"use client";
import { motion } from "framer-motion";

type Props = {
  content: string;
  position: { x: number; y: number };
};
const SVGTooltip = ({ content, position }: Props) => {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="rounded-large bg-content1 px-2 py-1 text-xs"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      style={{
        position: "absolute",
        left: position.x + 40 + "px",
        top: position.y - 10 - 25 + "px",
        transform: "translateX(-50%)",
      }}
    >
      {content}
    </motion.div>
  );
};
export default SVGTooltip;
