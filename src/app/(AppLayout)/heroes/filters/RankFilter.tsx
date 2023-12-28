"use client";
import { Select, SelectItem } from "@nextui-org/react";

export default function RankFilter() {
  return (
    <Select
      className="max-w-[10rem]"
      isDisabled
      label="Select rank"
      size="sm"
    >
      {Array.from({ length: 30 }).map((_, index) => (
        <SelectItem
          key={index + 1}
          textValue={(index + 1).toString()}
          value={index + 1}
        >
          {index + 1}
        </SelectItem>
      ))}
    </Select>
  );
}
