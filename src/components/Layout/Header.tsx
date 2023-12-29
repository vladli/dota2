"use client";
import { useState } from "react";
import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { albertus_font } from "@/app/fonts";
import { menu } from "@/lib/data";
import { cn } from "@/lib/utils";

import SearchBar from "../SearchBar";

<<<<<<< HEAD
import MenuItem from "./MenuItem";
import MenuItemMobile from "./MenuItemMobile";
=======
>>>>>>> 3895627 (Refactor search functionality and add SearchBar component)
import UserMenu from "./UserMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
<<<<<<< HEAD
    <Navbar
      className="relative z-50 h-16 select-none"
      classNames={{
        base: pathname !== "/" ? "border-b border-content2" : "",
      }}
      isMenuOpen={isMenuOpen}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      position="static"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
        <div className="flex gap-4">
=======
    <header className="relative z-50 select-none">
      <Navbar
        classNames={{
          base: pathname !== "/" ? "border-b border-content2" : "",
        }}
        isMenuOpen={isMenuOpen}
        maxWidth="full"
        onMenuOpenChange={setIsMenuOpen}
        position="static"
      >
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
>>>>>>> 3895627 (Refactor search functionality and add SearchBar component)
          <NavbarBrand className="hidden lg:flex">
            <Link
              className="group flex items-center gap-2"
              href="/"
            >
              <Image
                alt=""
                className="cursor-pointer transition-all group-hover:scale-110"
                draggable={false}
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
<<<<<<< HEAD
          <div>
            <Divider orientation="vertical" />
          </div>
          <MenuItem />
        </div>
      </NavbarContent>
      <NavbarContent
        className="lg:hidden"
        justify="center"
      >
        <NavbarBrand>
          <Link
            className="group flex items-center gap-2"
            href="/"
          >
            <Image
              alt=""
              className="cursor-pointer transition-all group-hover:scale-110"
              draggable={false}
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
      <NavbarContent justify="end">
        <SearchBar
          className="hidden max-w-48 lg:flex"
          {...{ setIsMenuOpen }}
        />
        <UserMenu />
      </NavbarContent>
      <NavbarMenu className="select-none">
        <SearchBar {...{ setIsMenuOpen }} />
        {menu.map(({ url, name, submenu }, index) => (
          <NavbarMenuItem key={`${name}-${index}`}>
            <MenuItemMobile
              key={`${name}-${index}`}
              {...{ setIsMenuOpen, url, name, submenu }}
            />
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
=======
        </NavbarContent>
        <NavbarContent justify="center">
          <NavbarBrand className="lg:hidden">
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
          <div className="hidden items-center gap-2 lg:flex">
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
          </div>
        </NavbarContent>
        <NavbarContent justify="end">
          <SearchBar className="hidden max-w-[12rem] lg:flex" />
          <UserMenu />
        </NavbarContent>
        <NavbarMenu>
          <SearchBar />
          {menu.map(({ name, url }, index) => (
            <NavbarMenuItem key={index}>
              <Link
                className="relative w-full"
                href={url}
                onClick={() => setIsMenuOpen(false)}
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
>>>>>>> 3895627 (Refactor search functionality and add SearchBar component)
  );
}
