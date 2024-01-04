"use client";
import { useState } from "react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  setIsMenuOpen?: any;
  name: string;
  url: string;
  submenu?: {
    name: string;
    url: string;
  }[];
};

const MenuItemMobile = React.memo(
  ({ setIsMenuOpen, url, name, submenu }: Props) => {
    const [toggled, setToggled] = useState<string | null>(null);
    const pathname = usePathname();
    const handleToggle = () => {
      if (toggled === null) setToggled(name);
      else setToggled(null);
    };

    const isActive = pathname === url;
    return (
      <motion.div>
        {!submenu!.length ? (
          <Link
            className="relative"
            href={url}
            onClick={() => setIsMenuOpen!(false)}
          >
            {isActive && (
              <motion.span
                className="absolute -inset-1 border-b-2 border-red-500"
                layoutId="active"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            {name}
          </Link>
        ) : (
          <div className="flex flex-col">
            <span
              className="flex cursor-pointer items-center gap-1"
              onClick={handleToggle}
            >
              {name}
              <motion.span
                animate={{ rotate: toggled ? 90 : 0 }}
                initial={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight size={16} />
              </motion.span>
            </span>
            <AnimatePresence>
              {submenu && toggled && (
                <motion.ul
                  animate={{ opacity: 1, height: "auto" }}
                  className="relative left-4 flex list-disc flex-col gap-2"
                  exit={{ opacity: 0, height: 0 }}
                  initial={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {submenu.map(({ url, name }) => (
                    <MenuItemMobile
                      key={name}
                      name={name}
                      setIsMenuOpen={setIsMenuOpen}
                      submenu={[]}
                      url={url}
                    />
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    );
  }
);

export default MenuItemMobile;
