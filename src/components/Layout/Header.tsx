"use client";
import { useState } from "react";
import {
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { albertus_font } from "@/app/fonts";
import { menu } from "@/lib/data";
import { cn } from "@/lib/utils";

import SearchBar from "../SearchBar";

import MenuItem from "./MenuItem";
import MenuItemMobile from "./MenuItemMobile";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="relative z-50 select-none">
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
          <div className="flex gap-4">
            <NavbarBrand className="hidden lg:flex">
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
            className="hidden max-w-[12rem] lg:flex"
            {...{ setIsMenuOpen }}
          />
          <UserMenu />
        </NavbarContent>
        <NavbarMenu className="select-none">
          <SearchBar {...{ setIsMenuOpen }} />
          {menu.map(({ url, name, submenu }, index) => (
            <MenuItemMobile
              key={`${name}-${index}`}
              {...{ setIsMenuOpen, url, name, submenu }}
            />
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
