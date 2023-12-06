"use client";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { menu } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <Navbar
        classNames={{ base: "bg-content1" }}
        position="static"
      >
        <NavbarBrand>Dota 2</NavbarBrand>
        <NavbarContent
          className="hidden gap-4 sm:flex"
          justify="center"
        >
          {menu.map(({ name, url }) => (
            <NavbarItem
              isActive={pathname === url}
              key={name}
            >
              <Link
                as={NextLink}
                color={pathname === url ? "primary" : "foreground"}
                href={url}
              >
                {name}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
      </Navbar>
    </header>
  );
}
