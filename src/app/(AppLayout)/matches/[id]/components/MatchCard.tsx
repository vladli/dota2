import { Image } from "@nextui-org/react";

import { GetMatchByIdQuery } from "@/graphql/match";
import dayjs from "@/lib/dayjs";
import { cn, secondsToTime } from "@/lib/utils";

type Props = {
  data: GetMatchByIdQuery;
};
export default function MatchCard({ data }: Props) {
  const match = data.match;
  const victory = match?.didRadiantWin ? "Radiant" : "Dire";
  const radiantScore = match?.radiantKills?.reduce(
    (acc, curr) => acc! + curr!,
    0
  );
  const direScore = match?.direKills?.reduce((acc, curr) => acc! + curr!, 0);
  return (
    <section className="flex flex-col items-center justify-around gap-4 py-10 lg:flex-row">
      <div className="hidden w-full flex-wrap items-center justify-center lg:flex lg:w-1/3">
        <Team
          team="Radiant"
          winner={victory}
        />
      </div>
      <div className="flex items-center justify-center gap-10 text-2xl font-semibold lg:w-1/3">
        <Score
          score={radiantScore}
          type="Radiant"
          victory={victory}
        />
        <div className="flex flex-col items-center">
          <span>{secondsToTime(match?.durationSeconds!)}</span>
          <span className="text-center text-base font-medium text-gray-400">
            {dayjs(match?.endDateTime * 1000).fromNow()}
          </span>
        </div>
        <Score
          score={direScore}
          type="Dire"
          victory={victory}
        />
      </div>
      <div className="hidden flex-col items-center font-medium lg:flex lg:w-1/3">
        <Team
          team="Dire"
          winner={victory}
        />
      </div>
    </section>
  );
}

function Team({ team, winner }: { team: string; winner: string }) {
  const image = team == "Radiant" ? "radiant" : "dire";
  return (
    <div
      className={cn("flex items-center gap-4", {
        "flex-row-reverse": team == "Dire",
      })}
    >
      <Image
        alt="Team"
        draggable={false}
        height={80}
        src={`/img/other/${image}.png`}
        width={80}
      />
      <div>
        <h1 className="text-foreground-600">{team}</h1>
        <h4
          className={cn(
            "w-fit text-sm bg-content1/50 rounded-large border border-divider px-2 py-1",
            {
              "bg-success-400/50": team == winner && winner == "Radiant",
              "bg-danger-500/50": team == winner && winner === "Dire",
            }
          )}
        >
          {winner === team ? "Won" : "Lost"}
        </h4>
      </div>
    </div>
  );
}

function Score({
  score,
  type,
  victory,
}: {
  score: number | null | undefined;
  type: "Radiant" | "Dire";
  victory: "Radiant" | "Dire";
}) {
  if (score === undefined) return null;
  return (
    <div
      className={cn(
        "rounded-large border size-12 flex justify-center items-center border-divider p-2 text-foreground-600 bg-content1/50",
        {
          "bg-success-400/50": type == "Radiant" && victory == "Radiant",
          "bg-danger-500/50": type == "Dire" && victory == "Dire",
        }
      )}
    >
      {score}
    </div>
  );
}
