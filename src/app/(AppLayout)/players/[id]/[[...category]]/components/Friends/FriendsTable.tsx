"use client";
import { useMemo } from "react";
import { Image } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";

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
      },
      {
        header: "Last Match",
        accessorFn: (row) => ({ lastMatch: row.lastMatchDateTime }),
        cell: ({ getValue }) => {
          const lastMatch = getValue()?.lastMatch;

          return <>{dayjs(lastMatch * 1000).fromNow()}</>;
        },
      },
    ],
    []
  );
  return (
    <div className="flex flex-col gap-2 rounded-large bg-content1 ">
      <div className="overflow-hidden hover:overflow-x-auto">
        <Table
          columns={columns}
          data={peers as object[]}
          defaultSorting={[{ id: "matches", desc: true }]}
        />
      </div>
    </div>
  );
}
