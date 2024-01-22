import { Image } from "@nextui-org/react";
import { Octagon } from "lucide-react";
import Link from "next/link";

import RoleImage from "@/components/RoleImage";
import Tooltip from "@/components/Tooltip";
import { GetLeaderBoardsQuery } from "@/graphql/leaderboard";
import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  header: string;
  data: GetLeaderBoardsQuery;
};
export default function Table({ header, data }: Props) {
  const isTop10 = header === "Top 10";
  const players = data.leaderboard?.season?.players;
  return (
    <div className="mt-4 rounded-large bg-content1">
      <div className="flex items-center gap-2 p-4">
        <Image
          alt="Rank Image"
          draggable={false}
          height={40}
          src={`/img/ranks/8_${isTop10 ? "10" : "100"}.png`}
          width={40}
        />
        <h2 className="w-fit uppercase">{header}</h2>
      </div>
      {players?.map((player, index) => (
        <div
          className={cn("flex items-center gap-2  p-2", {
            "border-b-1 border-b-content2": index !== players.length - 1,
          })}
          key={player?.steamAccountId}
        >
          <div className="relative">
            <Octagon
              absoluteStrokeWidth
              color={isTop10 ? "#4338ca" : "#ca8a04"}
              size={40}
            />
            <span className="absolute top-0 flex size-full items-center justify-center">
              {player?.rank}
            </span>
          </div>

          <RoleImage position={player?.position} />
          <div className="flex">
            {player?.steamAccount?.proSteamAccount?.team?.tag && (
              <Tooltip
                content={
                  <div className="flex items-center gap-2">
                    <Image
                      alt="Team Logo"
                      height={40}
                      src={
                        IMAGE.urlTeam +
                        player.steamAccount.proSteamAccount.team.id +
                        ".png"
                      }
                      width={40}
                    />
                    <span className="text-large font-medium">
                      {player.steamAccount.proSteamAccount.team.name}
                    </span>
                  </div>
                }
                showArrow
              >
                <Link
                  className="font-medium text-foreground-500"
                  href={`/teams/${player.steamAccount.proSteamAccount.team.id}`}
                >
                  {player?.steamAccount?.proSteamAccount?.team?.tag}.
                </Link>
              </Tooltip>
            )}
            <Link href={`/players/${player?.steamAccountId}`}>
              {player?.steamAccount?.proSteamAccount?.name ||
                player?.steamAccount?.name}
            </Link>
            R
          </div>
        </div>
      ))}
    </div>
  );
}
