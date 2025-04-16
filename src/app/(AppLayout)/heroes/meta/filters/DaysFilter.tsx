"use client";
import { useEffect, useState } from "react";
import { Select, Selection, SelectItem } from "@heroui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { createQueryString, deleteQueryString } from "@/lib/router";

export default function DaysFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchDays = searchParams.get("days");
  const days =
    searchDays && (+searchDays > 1 ? +searchDays <= 30 : false)
      ? new Set([searchDays])
      : new Set(["7"]);
  const [value, setValue] = useState<Selection>(days);
  const selectedValue = [...value][0] || "";

  useEffect(() => {
    if (selectedValue && selectedValue !== "7") {
      router.push(
        pathname +
          "?" +
          createQueryString("days", selectedValue.toString(), searchParams),
      );
    }
    if (
      selectedValue === "7" ||
      Number(selectedValue) <= 1 ||
      Number(selectedValue) > 30
    ) {
      router.push(pathname + "?" + deleteQueryString("days", searchParams));
    }
  }, [value]);

  return (
    <Select
      className="max-w-40"
      label="Select days"
      onSelectionChange={setValue}
      selectedKeys={value}
      size="sm"
    >
      {Array.from({ length: 29 }).map((_, index) => (
        <SelectItem
          key={index + 2}
          textValue={(index + 2).toString()}
          value={index + 2}
        >
          {index + 2}
        </SelectItem>
      ))}
    </Select>
  );
}
