"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Pagination } from "@nextui-org/react";

import Loading from "@/components/Loading";
import { GetPlayerMatchesDocument } from "@/graphql/player";

type Props = {
  playerId: string;
  matchCount: number | null | undefined;
};
export default function PlayerMatches({ playerId, matchCount }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useQuery(GetPlayerMatchesDocument, {
    fetchPolicy: "no-cache",
    variables: {
      steamAccountId: Number(playerId),
      take: 40,
      skip: 40 * (currentPage - 1),
    },
  });

  const pages = Math.ceil((matchCount || 1) / 40);
  if (!data || loading) return <Loading />;
  return (
    <div>
      {data?.player?.matches?.map((match) => (
        <div key={match?.id}>{match?.players?.[0]?.hero?.displayName}</div>
      ))}
      <Pagination
        color="secondary"
        onChange={setCurrentPage}
        page={currentPage}
        total={pages}
      />
    </div>
  );
}
