"use client";
import { useState } from "react";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { menu } from "@/lib/data";

import UserMenu from "./UserMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="relative z-50 select-none">
      <Navbar
        classNames={{ base: pathname !== "/" ? "bg-content1" : "" }}
        onMenuOpenChange={setIsMenuOpen}
        position="static"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden"
          />
          <NavbarBrand>
            <NextLink
              className="group flex items-center"
              href="/"
            >
              <Image
                alt=""
                className="cursor-pointer transition-all group-hover:scale-110"
                height={64}
                src="/img/dota2.png"
                width={64}
              />
              <span className="text-lg font-bold">Dota 2 Stats</span>
            </NextLink>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent
          className="hidden gap-4 font-medium md:flex"
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
        <NavbarContent justify="end">
          <UserMenu />
        </NavbarContent>
        <NavbarMenu>
          {menu.map(({ name, url }, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="w-full"
                color={pathname === url ? "primary" : "foreground"}
                href={url}
                size="lg"
              >
                {name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
