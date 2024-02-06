"use client";

import { useMemo } from "react";
import { Tab } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Tabs from "@/components/Tabs/Tabs";

type Props = {
  playerId: string;
};

export default function ClientTabs({ playerId }: Props) {
  const pathname = usePathname();

  const tabs = useMemo(
    () => [
      {
        href: `/players/${playerId}`,
        title: "Overview",
      },
      {
        href: `/players/${playerId}/matches`,
        title: "Matches",
      },
      {
        href: `/players/${playerId}/heroes`,
        title: "Heroes",
      },
      {
        href: `/players/${playerId}/friends`,
        title: "Friends",
      },
      {
        href: `/players/${playerId}/activity`,
        title: "Activity",
      },
    ],
    []
  );

  return (
    <Tabs
      aria-label="Options"
      className="mx-4 mt-4"
      selectedKey={pathname}
    >
      {tabs.map((tab) => (
        <Tab
          as={Link}
          href={tab.href}
          key={tab.href}
          title={tab.title}
        />
      ))}
    </Tabs>
  );
}
