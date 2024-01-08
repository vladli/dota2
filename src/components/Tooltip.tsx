"use client";
import { useState } from "react";
import { Tooltip as NextUITooltip } from "@nextui-org/react";

type Props = {
  children: React.ReactNode;
  closeDelay?: number;
} & React.ComponentProps<typeof NextUITooltip>;

export default function Tooltip({
  content,
  children,
  delay = 200,
  closeDelay = 300,
  ...rest
}: Props) {
  const [open, setIsOpen] = useState(false);
  const handleMouseEnter = () => {
    setTimeout(() => {
      setIsOpen(true);
    }, delay);
  };
  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, closeDelay);
  };
  return (
    <NextUITooltip
      content={content}
      isOpen={open}
      {...rest}
    >
      <div
        onKeyDown={() => setIsOpen(!open)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
    </NextUITooltip>
  );
}
