"use client";
import { useEffect, useState } from "react";
import { Image, Select, Selection, SelectItem } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString, deleteQueryString } from "@/lib/router";

const options = [
  "All",
  "Herald",
  "Guardian",
  "Crusader",
  "Archon",
  "Legend",
  "Ancient",
  "Divine",
  "Immortal",
];
export default function RankFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRank = searchParams.get("rank");
  const rank = searchRank ? new Set([searchRank]) : new Set(["All"]);
  const [value, setValue] = useState<Selection>(rank);
  const selectedValue = [...value][0] || "";
  useEffect(() => {
    if (selectedValue && selectedValue !== "All") {
      router.push(
        pathname +
          "?" +
          createQueryString("rank", selectedValue.toString(), searchParams),
      );
    }
    if (selectedValue === "All") {
      router.push(pathname + "?" + deleteQueryString("rank", searchParams));
    }
  }, [value]);
  return (
    <Select
      className="max-w-40"
      label="Select rank"
      onSelectionChange={setValue}
      selectedKeys={value}
      size="sm"
    >
      {options.map((item, index) => (
        <SelectItem
          key={item}
          startContent={
            index !== 0 && (
              <Image
                alt="rank"
                height={30}
                src={`/img/ranks/${index}.png`}
                width={30}
              />
            )
          }
        >
          {item}
        </SelectItem>
      ))}
    </Select>
  );
}
