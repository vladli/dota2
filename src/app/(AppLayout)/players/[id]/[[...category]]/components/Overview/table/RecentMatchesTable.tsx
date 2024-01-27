import { cn, Divider } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

import Container from "@/components/Container";
import HeroImage from "@/components/HeroImage";
import RankImage from "@/components/RankImage";
import RoleImage from "@/components/RoleImage";
import { GetPlayerMatchesQuery } from "@/graphql/player";
import { secondsToTime } from "@/lib/utils";

import TableTitle from "../TableTitle";

type Props = {
  data: GetPlayerMatchesQuery;
};
export default function RecentMatchesTable({ data }: Props) {
  const matches = data.player?.matches || [];
  let winStreak = 0;
  let loseStreak = 0;
  let currentWinStreak = 0;
  let currentLoseStreak = 0;
  for (let i = matches?.length; i >= 0; i--) {
    const isVictory = matches[i]?.players![0]?.isVictory;
    if (isVictory) {
      currentWinStreak++;
      currentLoseStreak = 0;
    } else {
      currentLoseStreak++;
      currentWinStreak = 0;
    }
    if (currentWinStreak > winStreak) {
      winStreak = currentWinStreak;
    }
    if (currentLoseStreak > loseStreak) {
      loseStreak = currentLoseStreak;
    }
  }
  return (
    <Container className="flex flex-col gap-2">
      <TableTitle>Recent Matches</TableTitle>
      <div className="grow p-2 font-medium">
        Current Streak{" "}
        <span
          className={cn(
            "size-6 inline-flex justify-center items-center rounded-small text-black font-semibold",
            {
              "bg-danger-500": currentLoseStreak,
              "bg-success-400": currentWinStreak,
            }
          )}
        >
          {currentWinStreak ? currentWinStreak : currentLoseStreak}
        </span>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-content2">
        {matches!.map((match) => {
          const player = match?.players![0];
          return (
            <NextLink
              className="flex min-w-max items-center justify-stretch gap-4 px-4 py-2 hover:bg-content2"
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
                <RoleImage
                  lane={player?.lane}
                  role={player?.role}
                />
              </div>
              <div
                className={cn(
                  "flex-initial shrink-0 w-6 h-6 flex items-center justify-center rounded-small text-black font-semibold",
                  {
                    "bg-success-400": match?.players![0]?.isVictory,
                    "bg-danger-500": !match?.players![0]?.isVictory,
                  }
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
                <div className="flex w-28 flex-initial flex-col items-end ">
                  <span>{secondsToTime(match?.durationSeconds!)}</span>
                  <span className="text-xs text-foreground-500">
                    {formatDistanceToNow(match?.endDateTime * 1000, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </NextLink>
          );
        })}
      </div>
    </Container>
  );
}
