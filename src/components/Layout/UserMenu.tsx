"use client";

import { FaSteam } from "react-icons/fa";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();
  return (
    <div className="font-medium">
      {!session ? (
        <Button
          onClick={() => signIn("steam")}
          startContent={<FaSteam />}
        >
          LOGIN
        </Button>
      ) : (
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: true,
                src: session?.user?.image || "",
              }}
              className="flex items-center transition-transform"
              description={session.user?.steamId}
              name={session.user?.name}
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="User Actions"
            variant="flat"
          >
            <DropdownItem
              as={Link}
              href={`/players/${session.user?.steamId}`}
              key="profile"
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              color="danger"
              key="logout"
              onClick={() => signOut()}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
}
