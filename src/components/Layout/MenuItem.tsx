import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { menu } from "@/lib/data";

export default function MenuItem() {
  const pathname = usePathname();
  return (
    <div className="hidden items-center gap-2 font-medium lg:flex">
      {menu.map(({ name, url, submenu }) =>
        !submenu.length ? (
          <NavbarItem
            isActive={pathname === url}
            key={name}
          >
            <Link
              className="relative"
              href={url}
            >
              {pathname === url && (
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
          </NavbarItem>
        ) : (
          <Dropdown
            key={name}
            placement="bottom-start"
          >
            <NavbarItem>
              <DropdownTrigger>
                <div className="relative flex cursor-pointer items-center gap-1">
                  {pathname.startsWith(url) && (
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
                  <ChevronDown size={16} />
                </div>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="MenuItems"
              itemClasses={{
                base: "gap-4",
              }}
              items={submenu}
            >
              {({ name, url }) => (
                <DropdownItem
                  as={Link}
                  href={url}
                  key={name}
                >
                  {name}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        )
      )}
    </div>
  );
}
