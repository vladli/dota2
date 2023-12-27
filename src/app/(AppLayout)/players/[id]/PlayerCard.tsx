import { FaSteam } from "react-icons/fa";
import { Avatar, Button, Image, Link, Tooltip } from "@nextui-org/react";

import { roboto_mono } from "@/app/fonts";
import { GetPlayerBySteamIdQuery } from "@/graphql/player";
import { cn, getAvatarLink, getRankName } from "@/lib/utils";

type Props = {
  data: GetPlayerBySteamIdQuery;
};
export default async function PlayerCard({ data }: Props) {
  const player = data.player;
  const winRate = ((player?.winCount! / player?.matchCount!) * 100).toFixed(1);

  return (
    <section className="mb-4 flex flex-col items-center gap-4 md:flex-row">
      <div className="select-none">
        <Avatar
          className="h-36 w-36"
          src={getAvatarLink(player?.steamAccount?.avatar) || ""}
        />
      </div>
      <div className="flex w-full flex-col items-center md:items-start">
        <div className="flex items-center justify-center gap-2 text-4xl md:justify-start">
          {player?.steamAccount?.name}
          <Button
            as={Link}
            href={player?.steamAccount?.profileUri!}
            isExternal
            isIconOnly
          >
            <FaSteam />
          </Button>
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
            player?.steamAccount?.seasonRank ? (
              <>
                {getRankName(player?.steamAccount?.seasonRank.toString()[0])}{" "}
                {player?.steamAccount?.seasonRank.toString()[1]}
              </>
            ) : (
              "Unknown"
            )
          }
          delay={100}
          offset={13}
          showArrow
        >
          <div className="cursor-help">
            {player?.steamAccount?.seasonRank ? (
              <>
                <Image
                  alt="rankStar"
                  className="absolute -top-2"
                  src={`/img/ranks/rank_star_${
                    player?.steamAccount?.seasonRank.toString()[1]
                  }.png`}
                  width={100}
                />
                <Image
                  alt="rank"
                  src={`/img/ranks/${
                    player?.steamAccount?.seasonRank.toString()[0]
                  }.png`}
                  width={100}
                />
              </>
            ) : (
              <Image
                alt="rank"
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
