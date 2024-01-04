import { Octagon } from "lucide-react";

import { GetLeaderBoardsQuery } from "@/graphql/leaderboard";
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
      <h1 className="w-fit p-4 text-xl font-bold uppercase">{header}</h1>
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
          {player?.steamAccount?.proSteamAccount?.name ||
            player?.steamAccount?.name}
        </div>
      ))}
    </div>
  );
}
