import { FaSteam } from "react-icons/fa";
import { Button, Image, Link } from "@nextui-org/react";
import { CheckCircle2 } from "lucide-react";

import { roboto_mono } from "@/app/fonts";
import Tooltip from "@/components/Tooltip";
import { GetPlayerBySteamIdQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { cn, getAvatarLink, getRankName } from "@/lib/utils";

type Props = {
  data: GetPlayerBySteamIdQuery;
};
export default async function PlayerCard({ data }: Props) {
  const proPlayer = data.player?.steamAccount?.proSteamAccount;
  const player = data.player;
  const winRate = ((player?.winCount! / player?.matchCount!) * 100).toFixed(1);
  const leaderRank = player?.steamAccount?.seasonLeaderboardRank;
  return (
    <section className="flex flex-col items-center gap-4 p-4 md:flex-row">
      <div className="min-w-36 select-none">
        <Image
          alt="Avatar"
          className="size-full"
          draggable={false}
          fetchPriority="high"
          radius="full"
          src={getAvatarLink(player?.steamAccount?.avatar) || ""}
        />
      </div>
      <div className="flex w-full flex-col items-center md:items-start">
        <div className="flex w-full flex-col items-center md:items-start">
          <div className="flex items-center justify-center gap-2 md:justify-start">
            {proPlayer && (
              <Tooltip
                content="Pro Player"
                showArrow
              >
                <div className="flex items-center">
                  <CheckCircle2 color="#0284c7" />
                </div>
              </Tooltip>
            )}
            <div className="flex text-4xl">
              {proPlayer?.team?.tag ? (
                <Tooltip
                  content={
                    <div className="flex items-center gap-2">
                      <Image
                        alt="Team Logo"
                        draggable={false}
                        height={40}
                        src={IMAGE.urlTeam + proPlayer.team.id + ".png"}
                        width={40}
                      />
                      <span className="text-large font-medium">
                        {proPlayer.team.name}
                      </span>
                    </div>
                  }
                  showArrow
                >
                  <span className="cursor-help text-foreground-500">
                    {proPlayer.team.tag + "."}
                  </span>
                </Tooltip>
              ) : null}
              {proPlayer?.name || player?.steamAccount?.name}
            </div>
            <Button
              as={Link}
              href={player?.steamAccount?.profileUri!}
              isExternal
              isIconOnly
            >
              <FaSteam />
            </Button>
          </div>
          {proPlayer && (
            <div className="text-foreground-500">
              {player?.steamAccount?.name}
            </div>
          )}
        </div>
        <div className="flex gap-4 text-lg uppercase">
          <div className="flex flex-col items-center font-medium">
            Wins <span className="text-success-400">{player?.winCount}</span>
          </div>
          <div className="flex flex-col items-center">
            Losses{" "}
            <span className="text-danger-500">
              {player?.matchCount! - player?.winCount!}
            </span>
          </div>
          <div className="flex flex-col items-center">
            WinRate <span>{winRate}%</span>
          </div>
        </div>
      </div>
      <div
        className={cn(
          roboto_mono.className,
          "flex w-full flex-col items-center md:flex-row gap-4 md:place-content-end"
        )}
      >
        {player?.steamAccount?.isDotaPlusSubscriber && (
          <div className="flex select-none flex-col items-center">
            <Image
              alt=""
              draggable={false}
              height={60}
              src="/img/other/dota_plus.webp"
              width={60}
            />
            <span className="uppercase">Dota Plus</span>
          </div>
        )}
        <Tooltip
          color="primary"
          content={
            !leaderRank && player?.steamAccount?.seasonRank ? (
              <>
                {getRankName(player?.steamAccount?.seasonRank.toString()[0])}{" "}
                {player?.steamAccount?.seasonRank.toString()[1]}
              </>
            ) : leaderRank ? (
              <>Top {leaderRank}</>
            ) : (
              "Unknown"
            )
          }
          offset={13}
          showArrow
        >
          <div className="cursor-help">
            {leaderRank <= 10 && leaderRank >= 1 && (
              <div className="relative">
                <Image
                  alt="rankStar"
                  draggable={false}
                  removeWrapper
                  src={`/img/ranks/8_10.png`}
                  width={100}
                />
                <span className="absolute bottom-1 left-1/2 z-50 -translate-x-1/2 text-lg font-semibold">
                  {leaderRank}
                </span>
              </div>
            )}
            {leaderRank <= 100 && leaderRank >= 11 && (
              <div className="relative">
                <Image
                  alt="rankStar"
                  draggable={false}
                  removeWrapper
                  src={`/img/ranks/8_100.png`}
                  width={100}
                />
                <span className="absolute bottom-1 left-1/2 z-50 -translate-x-1/2 text-lg font-semibold">
                  {leaderRank}
                </span>
              </div>
            )}
            {!leaderRank && player?.steamAccount?.seasonRank && (
              <>
                <Image
                  alt="rankStar"
                  className="absolute -top-2"
                  draggable={false}
                  src={`/img/ranks/rank_star_${
                    player?.steamAccount?.seasonRank.toString()[1]
                  }.png`}
                  width={100}
                />
                <Image
                  alt="rank"
                  draggable={false}
                  src={`/img/ranks/${
                    player?.steamAccount?.seasonRank.toString()[0]
                  }.png`}
                  width={100}
                />
              </>
            )}
            {!player?.steamAccount?.seasonRank && (
              <Image
                alt="rank"
                draggable={false}
                src={`/img/ranks/0.png`}
                width={100}
              />
            )}
          </div>
        </Tooltip>
      </div>
    </section>
  );
}
