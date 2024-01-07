"use client";

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Column } from "@tanstack/react-table";
import { useDebounce } from "@uidotdev/usehooks";

type Props = {
  column: Column<any, unknown>;
};

export default function HeroesFilter({ column }: Props) {
  const [value, setValue] = useState<any>("");
  const debounceValue = useDebounce(value, 500);

  useEffect(() => {
    column.setFilterValue(debounceValue);
  }, [debounceValue, column]);

  return (
    <Input
      className="max-w-[10rem]"
      isClearable
      onChange={(value) => setValue(value.target.value)}
      onClear={() => setValue("")}
      placeholder={`Search hero`}
      size="sm"
      type="text"
      value={(value ?? "") as string}
    />
  );
}
