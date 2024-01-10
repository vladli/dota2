import { useMemo, useState } from "react";
import { Image, Progress } from "@nextui-org/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

import Tooltip from "@/components/Tooltip";
import { GetMatchLanesQuery } from "@/graphql/mathch";
import { IMAGE } from "@/lib/constants";
import { cn, getRoleImage } from "@/lib/utils";

type Props = {
  data: GetMatchLanesQuery;
  highestNetWorth: number;
  highestExperience: number;
};

export default function Table({
  data,
  highestNetWorth,
  highestExperience,
}: Props) {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "position",
        size: 35,
        header: "",
        enableSorting: false,
        accessorFn: (row) => ({
          position: row.position,
          role: row.role,
          lane: row.lane,
        }),
        cell: (info: any) => (
          <Image
            alt=""
            className="min-w-[18px]"
            height={18}
            radius="none"
            src={getRoleImage(info.getValue().role, info.getValue().lane) || ""}
            width={18}
          />
        ),
      },
      {
        header: "Hero",
        size: 70,
        enableSorting: false,
        accessorFn: (row) => ({
          displayName: row.hero.displayName,
          shortName: row.hero.shortName,
        }),
        cell: (info: any) => (
          <Tooltip content={info.getValue().displayName}>
            <Image
              alt="Hero"
              className="min-w-[70px]"
              radius="sm"
              src={IMAGE.url + info.getValue().shortName + IMAGE.horizontal}
              width={70}
            />
          </Tooltip>
        ),
      },
      {
        header: "Player",
        enableSorting: false,
        accessorFn: (row) => row.steamAccount.name,
      },
      {
        header: "Level",
        size: 10,
        accessorFn: (row) => 1,
      },
      {
        header: "K",
        size: 10,
        accessorFn: (row) => {
          const kills = row.stats.killEvents.filter(
            (kill: any) => kill.time <= 600
          );
          return kills.length;
        },
      },
      {
        header: "D",
        size: 10,
        accessorFn: (row) => {
          const deaths = row.stats.deathEvents.filter(
            (death: any) => death.time <= 600
          );
          return deaths.length;
        },
      },
      {
        id: "assists",
        header: "A",
        size: 10,
        accessorFn: (row) => {
          const assists = row.stats.assistEvents.filter(
            (assist: any) => assist.time <= 600
          );
          return assists.length;
        },
      },
      {
        id: "netWorth",
        header: "Net Worth",
        accessorFn: (row) => ({
          isRadiant: row.isRadiant,
          netWorth: row.stats.networthPerMinute,
        }),
        sortingFn: (rowA, rowB, columnId) => {
          const numA = rowA.getValue<any>(columnId).netWorth[10];
          const numB = rowB.getValue<any>(columnId).netWorth[10];
          return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        cell: (info: any) => {
          const netWorth = info.getValue().netWorth[10];
          return (
            <div className="flex items-center gap-2">
              <span
                className={cn({
                  "underline underline-offset-8": highestNetWorth == netWorth,
                })}
              >
                {netWorth}
              </span>
              <Progress
                aria-label="Net Worth"
                className="min-w-20"
                classNames={{
                  indicator: info.getValue().isRadiant
                    ? "bg-green-500"
                    : "bg-red-500",
                }}
                maxValue={highestNetWorth}
                radius="none"
                value={netWorth}
              />
            </div>
          );
        },
      },
      {
        header: "Experience",
        accessorFn: (row) => ({
          experiencePerMinute: row.stats.experiencePerMinute,
        }),
        sortingFn: (rowA, rowB, columnId) => {
          const numA = rowA
            .getValue<any>(columnId)
            .experiencePerMinute.slice(0, 10)
            .reduce((a: number, b: number) => a + b, 0);
          const numB = rowB
            .getValue<any>(columnId)
            .experiencePerMinute.slice(0, 10)
            .reduce((a: number, b: number) => a + b, 0);
          return numA < numB ? -1 : numA > numB ? 1 : 0;
        },
        cell: (info: any) => {
          const experience = info
            .getValue()
            .experiencePerMinute.slice(0, 10)
            .reduce((a: number, b: number) => a + b, 0);
          return (
            <div className="flex items-center gap-2">
              <span
                className={cn({
                  "underline underline-offset-8":
                    highestExperience == experience,
                })}
              >
                {experience}
              </span>
              <Progress
                aria-label="Experience"
                className="min-w-20"
                color="default"
                maxValue={highestExperience}
                radius="none"
                value={experience}
              />
            </div>
          );
        },
      },
    ],
    []
  );
  const [sorting, setSorting] = useState<SortingState>([
    { id: "netWorth", desc: true },
  ]);
  const table = useReactTable({
    data: data.match?.players!,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="relative overflow-x-auto rounded-large shadow-md">
      <table className="w-full text-left">
        <thead className="whitespace-nowrap bg-content1 text-tiny uppercase text-foreground-500">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="px-4 py-3"
                  key={header.id}
                  style={{ width: `${header.getSize()}px` }}
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
                  style={{ width: `${cell.column.getSize()}px` }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
