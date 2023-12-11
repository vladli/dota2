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
import { signIn, signOut, useSession } from "next-auth/react";

export default function UserMenu() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-2 font-medium">
      {!session ? (
        <Button
          onClick={() => signIn("steam")}
          startContent={<FaSteam />}
        >
          LOGIN
        </Button>
      ) : (
        <div>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: session?.user?.image || "",
                }}
                className="transition-transform"
                description={session.user?.steamId}
                name={session.user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="User Actions"
              variant="flat"
            >
              <DropdownItem
                color="danger"
                key="logout"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
