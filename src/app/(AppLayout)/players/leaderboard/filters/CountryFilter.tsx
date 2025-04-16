"use client";
import { useEffect, useState } from "react";
import { Select, Selection, SelectItem } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString, deleteQueryString } from "@/lib/router";

const options = [
  { key: "AMERICAS", name: "America" },
  { key: "SE_ASIA", name: "SE Asia" },
  { key: "EUROPE", name: "Europe" },
  { key: "CHINA", name: "China" },
];

export default function CountryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRank = searchParams.get("region");
  const rank = searchRank ? new Set([searchRank]) : new Set(["AMERICAS"]);
  const [value, setValue] = useState<Selection>(rank);
  const selectedValue = [...value][0] || "";
  useEffect(() => {
    if (selectedValue && selectedValue !== "AMERICAS") {
      router.push(
        pathname +
          "?" +
          createQueryString("region", selectedValue.toString(), searchParams),
      );
    }
    if (selectedValue === "AMERICAS") {
      router.push(pathname + "?" + deleteQueryString("region", searchParams));
    }
  }, [value]);
  return (
    <Select
      className="max-w-40"
      label="Select region"
      onSelectionChange={setValue}
      selectedKeys={value}
      size="sm"
    >
      {options.map((item, index) => (
        <SelectItem key={item.key}>{item.name}</SelectItem>
      ))}
    </Select>
  );
}
