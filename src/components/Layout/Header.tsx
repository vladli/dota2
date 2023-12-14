"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { albertus_font } from "@/app/fonts";
import { menu } from "@/lib/data";
import { cn } from "@/lib/utils";

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
            <Link
              className="group flex items-center gap-2"
              href="/"
            >
              <Image
                alt=""
                className="cursor-pointer transition-all group-hover:scale-110"
                height={32}
                src="/img/dota2.png"
                width={32}
              />
              <span
                className={cn(
                  albertus_font.className,
                  "text-xl font-semibold uppercase"
                )}
              >
                Dota 2 Stats
              </span>
            </Link>
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
                className={cn(
                  albertus_font.className,
                  "relative text-lg uppercase"
                )}
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
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <UserMenu />
        </NavbarContent>
        <NavbarMenu>
          {menu.map(({ name, url }, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="relative w-full"
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
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
}
