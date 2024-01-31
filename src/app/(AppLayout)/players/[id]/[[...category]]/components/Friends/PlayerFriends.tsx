"use client";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Image } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";

import Loading from "@/components/Loading";
import PlayerName from "@/components/PlayerName";
import Table from "@/components/Table/Table";
import { GetPlayerPeersDocument } from "@/graphql/stratz";
import dayjs from "@/lib/dayjs";
import { getAvatarLink } from "@/lib/utils";
import {
  FilterMatchGroupOrderByEnum,
  FilterPlayerTeammateEnum,
  PlayerTeammateType,
} from "@/types/types.generated";

type Props = {
  playerId: string;
};
export default function PlayerFriends({ playerId }: Props) {
  const { data, loading } = useQuery(GetPlayerPeersDocument, {
    fetchPolicy: "no-cache",
    variables: {
      steamId: Number(playerId),
      take: 100,
      skip: 1,
      teammatesPeersRequest: {
        matchGroupOrderBy: FilterMatchGroupOrderByEnum.MatchCount,
        playerTeammateSort: FilterPlayerTeammateEnum.With,
        matchLimitMin: 10,
        skip: 0,
        take: 10000,
      },
    },
  });

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

  if (!data || loading) return <Loading />;
  return (
    <>
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
