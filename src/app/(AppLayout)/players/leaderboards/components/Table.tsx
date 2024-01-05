import { Image, Tooltip } from "@nextui-org/react";
import { Octagon } from "lucide-react";
import Link from "next/link";

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
          height={40}
          src={`/img/ranks/8_${isTop10 ? "10" : "100"}.png`}
          width={40}
        />
        <h1 className="w-fit text-xl font-bold uppercase">{header}</h1>
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
              color={isTop10 ? "#2563eb" : "#ca8a04"}
              size={40}
            />
            <span className="absolute top-0 flex h-full w-full items-center justify-center">
              {player?.rank}
            </span>
          </div>
          <div>
            {player?.steamAccount?.proSteamAccount?.team && (
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
                delay={100}
                showArrow
              >
                <span className="cursor-help font-medium text-foreground-500">
                  {player?.steamAccount?.proSteamAccount?.team?.tag}.
                </span>
              </Tooltip>
            )}
            <Link href={`/players/${player?.steamAccountId}`}>
              {player?.steamAccount?.proSteamAccount?.name ||
                player?.steamAccount?.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
