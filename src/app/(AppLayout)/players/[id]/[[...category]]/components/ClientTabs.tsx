"use client";

import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  playerId: string;
};
export default function ClientTabs({ playerId }: Props) {
  const pathname = usePathname();
  return (
    <Tabs
      aria-label="Options"
      className="mx-4 mt-4"
      classNames={{
        tabList: "bg-transparent border border-divider",
        cursor: "group-data-[selected=true]:bg-content2",
      }}
      selectedKey={pathname}
    >
      <Tab
        as={Link}
        href={`/players/${playerId}`}
        key={`/players/${playerId}`}
        title="Overview"
      />
      <Tab
        as={Link}
        href={`/players/${playerId}/matches`}
        key={`/players/${playerId}/matches`}
        title="Matches"
      />
    </Tabs>
  );
}
