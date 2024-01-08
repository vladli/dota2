import { cn, Divider, Image } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

import { GetPlayerMatchesQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { getRoleImage, secondsToTime } from "@/lib/utils";

import TableTitle from "../TableTitle";

type Props = {
  data: GetPlayerMatchesQuery;
};
export default function RecentMatchesTable({ data }: Props) {
  const matches = data.player?.matches;
  return (
    <div className="flex flex-col gap-2 rounded-large bg-content1 p-4">
      <TableTitle>Recent Matches</TableTitle>
      <div className="overflow-x-auto">
        {matches!.map((match) => {
          const player = match?.players![0];
          return (
            <NextLink
              className="flex h-14 items-center justify-stretch gap-4 px-4 py-2 hover:bg-content2"
              href={`/matches/${match?.id}`}
              key={match?.id}
            >
              <div className="shrink-0">
                <Image
                  alt="Hero"
                  className="min-w-[60px]"
                  radius="none"
                  removeWrapper
                  src={IMAGE.url + player?.hero?.shortName + IMAGE.horizontal}
                  width={60}
                />
              </div>
              <Divider orientation="vertical" />
              <div className="shrink-0">
                <Image
                  alt=""
                  height={14}
                  radius="none"
                  src={getRoleImage(player?.role, player?.lane) || ""}
                  width={14}
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
                  {match?.actualRank?.toString()[1] !== "0" && (
                    <Image
                      alt="rankStar"
                      className="absolute -top-1"
                      src={`/img/ranks/rank_star_${
                        match?.actualRank?.toString()[1]
                      }.png`}
                      width={40}
                    />
                  )}
                  <Image
                    alt="rank"
                    src={`/img/ranks/${match?.actualRank?.toString()[0]}.png`}
                    width={40}
                  />
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
    </div>
  );
}
