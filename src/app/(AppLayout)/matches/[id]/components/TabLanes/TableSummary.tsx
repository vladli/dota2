import { useMemo } from "react";
import { Image, Progress } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";

import Table from "@/components/Table/Table";
import Tooltip from "@/components/Tooltip";
import { GetMatchLanesQuery } from "@/graphql/match";
import { IMAGE } from "@/lib/constants";
import { cn, getRoleInfo } from "@/lib/utils";

type Props = {
  data: GetMatchLanesQuery;
  highestNetWorth: number;
  highestExperience: number;
};

export default function TableSummary({
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
        meta: {
          isSticky: true,
        },
        accessorFn: (row) => ({
          position: row.position,
          role: row.role,
          lane: row.lane,
        }),
        cell: (info: any) => (
          <Tooltip
            content={
              getRoleInfo(info.getValue().role, info.getValue().lane)?.name
            }
          >
            <Image
              alt=""
              className="min-w-[18px]"
              height={18}
              radius="none"
              src={
                getRoleInfo(info.getValue().role, info.getValue().lane)
                  ?.image || ""
              }
              width={18}
            />
          </Tooltip>
        ),
      },
      {
        header: "Hero",
        size: 70,
        enableSorting: false,
        meta: {
          isSticky: true,
        },
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
        accessorFn: (row) =>
          row.stats.level.filter((level: number) => level <= 600).length,
        cell: (info: any) => (
          <div className="flex size-8 items-center justify-center rounded-full border-2 border-divider">
            {info.getValue()}
          </div>
        ),
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
                    ? "!bg-green-500"
                    : "!bg-red-500",
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
      {
        header: "LH",
        size: 10,
        accessorFn: (row) => {
          const lastHits = row.stats.lastHitsPerMinute
            .slice(0, 10)
            .reduce((a: number, b: number) => a + b, 0);
          return lastHits;
        },
      },
      {
        header: "DN",
        size: 10,
        accessorFn: (row) => {
          const denies = row.stats.deniesPerMinute
            .slice(0, 10)
            .reduce((a: number, b: number) => a + b, 0);
          return denies;
        },
      },
    ],
    []
  );

  return (
    <div className="relative overflow-x-auto rounded-large shadow-md">
      <Table
        columns={columns}
        data={data.match?.players!}
        defaultSorting={[{ id: "netWorth", desc: true }]}
      />
    </div>
  );
}
