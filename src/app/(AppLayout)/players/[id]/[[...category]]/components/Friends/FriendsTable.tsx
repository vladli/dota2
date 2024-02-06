"use client";
import { useMemo } from "react";
import { Image } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

import HeaderValue from "@/components/HeaderValue";
import PlayerName from "@/components/PlayerName";
import Table from "@/components/Table/Table";
import { GetPlayerPeersQuery } from "@/graphql/stratz";
import { getAvatarLink } from "@/lib/utils";
import { PlayerTeammateType } from "@/types/types.generated";

type Props = {
  data: GetPlayerPeersQuery;
};

export default function FriendsTable({ data }: Props) {
  const peers = data?.stratz?.page?.player?.peers?.filter(
    (peer) => peer?.steamAccount !== null
  );

  const columns = useMemo<ColumnDef<PlayerTeammateType, any>[]>(
    () => [
      {
        header: "Player",
        accessorFn: (row) => ({ steamAccount: row.steamAccount }),
        cell: ({ getValue }) => (
          <div className="flex items-center gap-2">
            <Image
              alt=""
              className="min-w-[40px]"
              radius="sm"
              src={getAvatarLink(getValue()?.steamAccount?.avatar) || ""}
              width={40}
            />

            <PlayerName steamAccount={getValue()?.steamAccount} />
          </div>
        ),
        sortingFn: (rowA: any, rowB: any, columnId) => {
          const heroA = rowA.getValue(columnId)?.steamAccount?.name;
          const heroB = rowB.getValue(columnId)?.steamAccount?.name;
          return heroA < heroB ? 1 : heroA > heroB ? -1 : 0;
        },
      },
      {
        id: "matches",
        header: "Matches",
        accessorFn: (row) => ({ matches: row.matchCount }),
        cell: ({ getValue }) => <>{getValue()?.matches}</>,
      },
      {
        header: "Win Rate",
        accessorFn: (row) => ({ matches: row.matchCount, wins: row.winCount }),
        cell: ({ getValue }) => {
          const matches = getValue()?.matches;
          const wins = getValue()?.wins;
          const winRate = matches && wins ? (wins / matches) * 100 : 0;
          return <>{winRate.toFixed(1)}%</>;
        },
        sortingFn: (rowA: any, rowB: any, columnId) => {
          const winRateA =
            rowA.getValue(columnId)?.matches && rowA.getValue(columnId)?.wins
              ? (rowA.getValue(columnId)?.wins /
                  rowA.getValue(columnId)?.matches) *
                100
              : 0;
          const winRateB =
            rowB.getValue(columnId)?.matches && rowB.getValue(columnId)?.wins
              ? (rowB.getValue(columnId)?.wins /
                  rowB.getValue(columnId)?.matches) *
                100
              : 0;

          return winRateA < winRateB ? -1 : winRateA > winRateB ? 1 : 0;
        },
      },
      {
        header: "Last Match",
        accessorFn: (row) => row.lastMatchDateTime,
        cell: ({ getValue }) => {
          const lastMatch = getValue();
          return <>{dayjs(lastMatch * 1000).fromNow()}</>;
        },
      },
    ],
    []
  );
  return (
    <>
      <HeaderValue
        className="mb-4"
        header="Friends"
        value={peers?.length || 0}
      />
      <div className="flex flex-col gap-2 rounded-large bg-content1 ">
        <div className="overflow-hidden hover:overflow-x-auto">
          <Table
            columns={columns}
            data={peers as object[]}
            defaultSorting={[{ id: "matches", desc: true }]}
          />
        </div>
      </div>
    </>
  );
}
