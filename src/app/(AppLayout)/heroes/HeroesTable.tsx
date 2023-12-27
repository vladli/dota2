"use client";
import { useState } from "react";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { Image, Link } from "@nextui-org/react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import NextLink from "next/link";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

import Filters from "./Filters";

type Props = {
  heroes: GetAllHeroesQuery;
};

const columns: ColumnDef<any>[] = [
  {
    id: "hero",
    header: "Hero",
    accessorFn: (row) => ({
      id: row.id,
      displayName: row.displayName,
      shortName: row.shortName,
    }),
    cell: (info: any) => (
      <div className="flex items-center gap-2">
        <Image
          alt="Hero"
          className="min-w-[70px]"
          radius="sm"
          src={IMAGE.url + info.getValue().shortName + IMAGE.horizontal}
          width={70}
        />
        <Link
          as={NextLink}
          color="foreground"
          href={`/heroes/${info.getValue().id}`}
          underline="hover"
        >
          {info.getValue().displayName}
        </Link>
      </div>
    ),
    enableColumnFilter: true,
    filterFn: (row, id, filterValue) => {
      const value = row.getValue(id);
      return (value as { displayName: string }).displayName
        .toLowerCase()
        .includes(filterValue);
    },
  },
  {
    accessorFn: (row) => {
      const length = row?.stats.length - 1;
      const winRate =
        (row?.stats?.[length]?.winCount! / row?.stats?.[length]?.matchCount!) *
        100;
      return winRate;
    },
    cell: (info: any) => <span>{info.getValue().toFixed(1)}</span>,
    header: "Start",
  },
  {
    id: "end",

    accessorFn: (row) => {
      const winRate =
        (row?.stats?.[0]?.winCount! / row?.stats?.[0]?.matchCount!) * 100;
      return winRate;
    },
    cell: (info: any) => <span>{info.getValue().toFixed(1)}</span>,
    header: "End",
  },
  {
    accessorFn: (row) => {
      const length = row?.stats.length - 1;
      const winRate =
        (row?.stats?.[length]?.winCount! / row?.stats?.[length]?.matchCount!) *
        100;
      const winRateEnd =
        (row?.stats?.[0]?.winCount! / row?.stats?.[0]?.matchCount!) * 100;
      const difference = winRateEnd - winRate;
      return difference;
    },
    cell: (info: any) => (
      <span
        className={cn({
          "text-red-400": info.getValue() < 0,
          "text-green-400": info.getValue() > 0,
        })}
      >
        {info.getValue().toFixed(1)}
      </span>
    ),
    header: "+/-",
  },
];
export default function HeroesTable({ heroes }: Props) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const table = useReactTable({
    data: heroes.constants?.heroes!,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    initialState: {
      sorting: [{ id: "end", desc: true }],
    },
  });
  return (
    <div>
      <Filters headerGroups={table.getHeaderGroups()} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left">
          <thead className="whitespace-nowrap bg-default-100 text-tiny uppercase text-foreground-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-4 py-3"
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex gap-1 items-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <TiArrowSortedUp />,
                          desc: <TiArrowSortedDown />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                className="border-b border-content2"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-4 py-2"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
