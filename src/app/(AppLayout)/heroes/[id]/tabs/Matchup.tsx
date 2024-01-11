import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Image, Progress } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import Loading from "@/components/Loading";
import Table from "@/components/Table/Table";
import Tooltip from "@/components/Tooltip";
import { GetAllHeroesQuery, GetHeroByIdQuery } from "@/graphql/constants";
import { GetHeroMatchUpsDocument } from "@/graphql/heroStats";
import { IMAGE } from "@/lib/constants";

type Props = {
  heroId: number;
  hero: GetHeroByIdQuery;
  allHeroes: GetAllHeroesQuery;
};
export default function Matchup({ hero, allHeroes }: Props) {
  const { data, loading } = useQuery(GetHeroMatchUpsDocument, {
    fetchPolicy: "no-cache",
    variables: {
      heroId: hero.constants?.hero?.id || 1,
      matchLimit: 0,
    },
  });

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        header: "Hero",
        accessorKey: "heroId2",
        size: 70,
        sortingFn: (rowA, rowB, columnId) => {
          const heroA = allHeroes?.constants?.heroes?.find(
            (hero) => hero?.id === rowA.getValue(columnId)
          )?.displayName!;
          const heroB = allHeroes?.constants?.heroes?.find(
            (hero) => hero?.id === rowB.getValue(columnId)
          )?.displayName!;
          return heroA < heroB ? 1 : heroA > heroB ? -1 : 0;
        },
        filterFn: (row, id, filterValue) => {
          const value = row.getValue(id);
          const hero = allHeroes?.constants?.heroes?.find(
            (hero) => hero?.id === value
          );
          return hero!.displayName!.toLowerCase().includes(filterValue);
        },
        cell: (row: any) => {
          const hero = allHeroes?.constants?.heroes?.find(
            (hero) => hero?.id === row.getValue()
          );
          return (
            <Tooltip content={hero?.displayName}>
              <Link href={`/heroes/${hero?.id}`}>
                <Image
                  alt=""
                  className="min-w-[70px]"
                  src={IMAGE.url + hero?.shortName + IMAGE.horizontal}
                  width={70}
                />
              </Link>
            </Tooltip>
          );
        },
      },
      {
        header: "Versus",
        accessorKey: "matchCountVs",
        size: 50,
      },
      {
        id: "winRateVs",
        header: "Win Rate",
        accessorFn: (row) => {
          const winRate = (row.winCountVs / row.matchCountVs) * 100;
          return winRate;
        },
        cell: (row: any) => (
          <div className="flex items-center gap-2">
            {row.getValue().toFixed(1)}%
            <Progress
              aria-label="Win Rate"
              className="min-w-20"
              classNames={{
                indicator:
                  row.getValue() >= 50 ? "!bg-green-500" : "!bg-red-500",
              }}
              radius="none"
              value={row.getValue()}
            />
          </div>
        ),
      },
      {
        id: "Counter",
        header: "Counter",
        accessorKey: "synergyVs",
        size: 50,
        cell: (row: any) => `${row.getValue().toFixed(1)}%`,
      },
      {
        id: "spacer",
        header: "",
        size: 50,
        cell: () => <div className="h-10 w-[1px] bg-divider" />,
      },
      {
        header: "With",
        size: 50,
        accessorKey: "matchCount",
      },
      {
        id: "winRateWith",
        header: "Win Rate",
        accessorFn: (row) => {
          const winRate = (row.winCount / row.matchCount) * 100;
          return winRate;
        },
        cell: (row: any) => (
          <div className="flex items-center gap-2">
            {row.getValue().toFixed(1)}%
            <Progress
              aria-label="Win Rate"
              className="min-w-20"
              classNames={{
                indicator:
                  row.getValue() >= 50 ? "!bg-green-500" : "!bg-red-500",
              }}
              radius="none"
              value={row.getValue()}
            />
          </div>
        ),
      },
      {
        header: "Synergy",
        size: 50,
        accessorKey: "synergy",
        cell: (row: any) => `${row.getValue().toFixed(1)}%`,
      },
    ],
    []
  );
  if (!data || loading) return <Loading />;
  const vsRows = data?.heroStats?.heroVsHeroMatchup?.advantage?.[0]?.vs?.map(
    (vsItem) => ({
      heroId2: vsItem?.heroId2,
      matchCountVs: vsItem?.matchCount,
      synergyVs: vsItem?.synergy,
      winCountVs: vsItem?.winCount,
    })
  );

  const withRows =
    data?.heroStats?.heroVsHeroMatchup?.advantage?.[0]?.with?.map(
      (withItem) => ({
        heroId: data.heroStats?.heroVsHeroMatchup?.advantage?.[0]?.heroId,
        heroId2: withItem?.heroId2,
        matchCount: withItem?.matchCount,
        synergy: withItem?.synergy,
        winCount: withItem?.winCount,
      })
    );

  const combinedRows = withRows?.map((withItem) => {
    const correspondingVsItem = vsRows?.find(
      (vsItem) => vsItem?.heroId2 === withItem?.heroId2
    );
    return {
      ...withItem,
      ...(correspondingVsItem || {}),
    };
  });
  return (
    <div className="overflow-x-auto rounded-large bg-black">
      <Table
        columns={columns}
        data={combinedRows || []}
        defaultSorting={[{ id: "Counter", desc: true }]}
      />
    </div>
  );
}
