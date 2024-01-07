"use client";
import { useState } from "react";
import { Image, Link } from "@nextui-org/react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
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
    header: "Winrate",
    columns: [
      {
        id: "winStart",
        header: "Start",

        accessorFn: (row) => {
          const length = row?.statistic.length - 1;
          const winRate =
            (row?.statistic?.[length]?.winCount! /
              row?.statistic?.[length]?.matchCount!) *
            100;
          return winRate;
        },
        cell: (info: any) => <span>{info.getValue().toFixed(1)}</span>,
      },
      {
        id: "winEnd",
        header: "End",

        accessorFn: (row) => {
          const winRate =
            (row?.statistic?.[0]?.winCount! /
              row?.statistic?.[0]?.matchCount!) *
            100;
          return winRate;
        },
        cell: (info: any) => <span>{info.getValue().toFixed(1)}</span>,
      },
      {
        id: "windDifference",
        header: "+/-",

        accessorFn: (row) => {
          const length = row?.statistic.length - 1;
          const winRate =
            (row?.statistic?.[length]?.winCount! /
              row?.statistic?.[length]?.matchCount!) *
            100;
          const winRateEnd =
            (row?.statistic?.[0]?.winCount! /
              row?.statistic?.[0]?.matchCount!) *
            100;
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
      },
    ],
  },

  {
    header: "Matches",
    columns: [
      {
        id: "pickStart",
        header: "Start",

        accessorFn: (row) => {
          const length = row?.statistic.length - 1;
          const pickRate = row?.statistic?.[length]?.matchCount!;
          return pickRate;
        },
        cell: (info: any) => <span>{info.getValue()}</span>,
      },
      {
        id: "pickEnd",
        header: "End",

        accessorFn: (row) => {
          const winRate = row?.statistic?.[0]?.matchCount!;
          return winRate;
        },
        cell: (info: any) => <span>{info.getValue()}</span>,
      },
      {
        id: "pickDifference",
        header: "+/-",

        accessorFn: (row) => {
          const length = row?.statistic.length - 1;
          const winRate = row?.statistic?.[length]?.matchCount!;
          const winRateEnd = row?.statistic?.[0]?.matchCount!;
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
            {info.getValue()}
          </span>
        ),
      },
    ],
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

    initialState: {
      sorting: [{ id: "winEnd", desc: true }],
    },
  });
  const stats = (heroes.constants?.heroes?.[0] as { statistic: any })
    ?.statistic;

  const startDate = new Date(stats[0].day * 1000);
  const endDate = new Date(stats[stats.length - 1].day * 1000);
  const formatDate = (date: Date | null) => {
    return date
      ? date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : null;
  };
  return (
    <div>
      <Filters headerGroups={table.getHeaderGroups()} />
      <h1 className="mb-4 text-lg font-semibold">
        Stats for: {formatDate(startDate)} - {formatDate(endDate)}
      </h1>
      <div className="relative overflow-x-auto rounded-large shadow-md">
        <table className="w-full text-left">
          <thead className="whitespace-nowrap bg-default-100 text-tiny uppercase text-foreground-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-4 py-3 text-center"
                    colSpan={header.colSpan}
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
                          asc: <ArrowUpWideNarrow size={16} />,
                          desc: <ArrowDownWideNarrow size={16} />,
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
