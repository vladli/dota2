import { FaSteam } from "react-icons/fa";
import { Avatar, Button, Image, Link, Tooltip } from "@nextui-org/react";

import { getPlayerWinRate } from "@/actions/actions";
import { roboto_mono } from "@/app/fonts";
import { cn, getRankName } from "@/lib/utils";
import { IPlayer } from "@/types/types";

type Props = {
  steamId: string;
  player: IPlayer;
};
export default async function PlayerCard({ steamId, player }: Props) {
  const data = await getPlayerWinRate(steamId);
  const winRate = ((data.win / (data.win + data.lose)) * 100).toFixed(1);

  return (
    <section className="mb-4 flex flex-col items-center gap-4 md:flex-row">
      <div className="select-none">
        <Avatar
          className="h-36 w-36"
          src={player.profile.avatarfull}
        />
      </div>
      <div className="flex w-full flex-col items-center md:items-start">
        <div className="flex items-center justify-center gap-2 text-4xl md:justify-start">
          {player.profile.personaname}
          <Button
            as={Link}
            href={player.profile.profileurl}
            isExternal
            isIconOnly
          >
            <FaSteam />
          </Button>
        </div>
        <div className="flex gap-4 text-lg uppercase">
          <div className="flex flex-col items-center font-medium">
            Wins <span className="text-green-500">{data.win}</span>
          </div>
          <div className="flex flex-col items-center">
            Losses <span className="text-red-500">{data.lose}</span>
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
        {player.profile.plus && (
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
            player.rank_tier ? (
              <>
                {getRankName(player.rank_tier.toString()[0])}{" "}
                {player.rank_tier.toString()[1]}
              </>
            ) : (
              "Unknown"
            )
          }
          delay={100}
          offset={13}
          showArrow
        >
          <div>
            <Image
              alt="rankStar"
              className="absolute -top-2"
              src={`/img/ranks/rank_star_${player.rank_tier.toString()[1]}.png`}
              width={100}
            />
            <Image
              alt="rank"
              src={`/img/ranks/${player.rank_tier.toString()[0]}.png`}
              width={100}
            />
          </div>
        </Tooltip>
      </div>
    </section>
  );
}
