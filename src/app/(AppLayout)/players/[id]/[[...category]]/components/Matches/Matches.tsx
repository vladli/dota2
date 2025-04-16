"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Divider, Pagination } from "@heroui/react";
import Link from "next/link";

import HeaderValue from "@/components/HeaderValue";
import HeroImage from "@/components/HeroImage";
import Loading from "@/components/Loading";
import RankImage from "@/components/RankImage";
import RoleImage from "@/components/RoleImage";
import { GetPlayerMatchesDocument } from "@/graphql/player";
import dayjs from "@/lib/dayjs";
import { cn, secondsToTime } from "@/lib/utils";

type Props = {
  playerId: string;
  matchCount: number | null | undefined;
};
export default function Matches({ playerId, matchCount }: Props) {
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
  const matches = data?.player?.matches;
  if (!data || loading) return <Loading />;
  return (
    <>
      <HeaderValue className="mb-4" header="Matches" value={matchCount} />
      <div className="flex flex-col gap-2 rounded-large bg-content1">
        <div className="overflow-hidden hover:overflow-x-auto">
          {matches!.map((match) => {
            const player = match?.players![0];
            return (
              <Link
                className="flex h-14 min-w-max items-center justify-stretch gap-4 px-4 py-2 hover:bg-content2"
                href={`/matches/${match?.id}`}
                key={match?.id}
              >
                <div className="shrink-0">
                  <HeroImage
                    displayName={player?.hero?.displayName!}
                    heroId={player?.hero?.id}
                    isLink={false}
                    isTooltip
                    shortName={player?.hero?.shortName}
                  />
                </div>
                <Divider orientation="vertical" />
                <div className="shrink-0">
                  <RoleImage lane={player?.lane} role={player?.role} />
                </div>
                <div
                  className={cn(
                    "flex h-6 w-6 flex-initial shrink-0 items-center justify-center rounded-small font-semibold text-black",
                    {
                      "bg-success-400": match?.players![0]?.isVictory,
                      "bg-danger-500": !match?.players![0]?.isVictory,
                    },
                  )}
                >
                  {match?.players![0]?.isVictory ? "W" : "L"}
                </div>
                <Divider orientation="vertical" />
                <div className="w-32 flex-none shrink-0">
                  {player?.kills} / {player?.deaths} / {player?.assists}
                </div>
                <div className="flex shrink-0 grow justify-end gap-2">
                  <div className="relative my-auto">
                    <RankImage rank={match?.actualRank} />
                  </div>
                  <div>
                    <Divider orientation="vertical" />
                  </div>
                  <div className="flex w-28 flex-initial flex-col items-end">
                    <span>{secondsToTime(match?.durationSeconds!)}</span>
                    <span className="text-xs text-foreground-500">
                      {dayjs(match?.endDateTime * 1000).fromNow()}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Pagination
        className="my-4 place-self-center"
        color="primary"
        onChange={setCurrentPage}
        page={currentPage}
        total={pages}
      />
    </>
  );
}
