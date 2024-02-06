"use client";
import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import DotaPlusImage from "@/components/DotaPlusImage";
import HeroImage from "@/components/HeroImage";
import Table from "@/components/Table/Table";
import { GetMostPlayedHeroesQuery } from "@/graphql/player";
import dayjs from "@/lib/dayjs";
import { getDotaPlus } from "@/lib/utils";
import { MatchGroupByHeroType } from "@/types/types.generated";

type Props = {
  data: GetMostPlayedHeroesQuery;
};
export default function HeroesTable({ data }: Props) {
  const player = data.player;
  const heroes = player?.heroesGroupBy
    ?.toSorted((a: any, b: any) => b.matchCount - a.matchCount)
    .filter((hero: any) => hero?.heroId);
  const dotaPlus = (heroId: number) => getDotaPlus(player?.dotaPlus, heroId);

  const columns = useMemo<ColumnDef<MatchGroupByHeroType, any>[]>(
    () => [
      {
        header: "Hero",
        meta: {
          isSticky: true,
        },
        accessorFn: (row) => ({ hero: row.hero }),
        cell: ({ getValue }: any) => (
          <div className="w-fit">
            <HeroImage
              displayName={getValue().hero.displayName}
              heroId={getValue().hero.id}
              isTooltip
              shortName={getValue().hero.shortName}
            />
          </div>
        ),
        sortingFn: (rowA: any, rowB: any, columnId) => {
          const valueA = rowA.getValue(columnId)?.hero?.displayName;
          const valueB = rowB.getValue(columnId)?.hero?.displayName;
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        },
      },
      {
        header: "Tier",
        accessorFn: (row) => dotaPlus(row.heroId) || 0,
        cell: ({ getValue }: any) => {
          const tier = getValue();
          return (
            <div>
              <DotaPlusImage
                level={tier}
                size={40}
              />
            </div>
          );
        },
      },
      {
        id: "Matches",
        header: "Matches",
        accessorFn: (row) => row.matchCount,
      },
      {
        size: 50,
        header: "Win Rate",
        accessorFn: (row) =>
          (((row.winCount || 0) / (row.matchCount || 0)) * 100).toFixed(1),
        cell: ({ getValue }: any) => getValue() + "%",
      },
      {
        id: "spacer",
        header: "",
        size: 50,
        cell: () => <div className="h-10 w-[1px] bg-divider" />,
        enableSorting: false,
      },
      {
        size: 50,
        header: "K",
        accessorFn: (row) => row.avgKills?.toFixed(0),
        cell: ({ getValue }: any) => getValue(),
      },
      {
        size: 50,
        header: "D",
        accessorFn: (row) => row.avgDeaths?.toFixed(0),
        cell: ({ getValue }: any) => getValue(),
      },
      {
        size: 50,
        header: "A",
        accessorFn: (row) => row.avgAssists?.toFixed(0),
        cell: ({ getValue }: any) => getValue(),
      },
      {
        size: 50,
        header: "GPM",
        accessorFn: (row) => row.avgGoldPerMinute?.toFixed(0),
        cell: ({ getValue }: any) => getValue(),
      },
      {
        size: 50,
        header: "XPM",
        accessorFn: (row) => row.avgExperiencePerMinute?.toFixed(0),
        cell: ({ getValue }: any) => getValue(),
      },
      {
        header: "Last Game",
        accessorFn: (row) => row.lastMatchDateTime,
        cell: ({ getValue }: any) => {
          const date = dayjs(getValue() * 1000).fromNow();
          return <span className="text-sm">{date}</span>;
        },
      },
    ],
    []
  );

  return (
    <div>
      <Table
        columns={columns}
        data={heroes as object[]}
        defaultSorting={[{ id: "Matches", desc: true }]}
        showCount
      />
    </div>
  );
}
