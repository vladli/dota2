import { formatDistanceToNow } from "date-fns";

import { GetMatchByIdQuery } from "@/graphql/mathch";
import { cn, getRegionName, secondsToTime } from "@/lib/utils";

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
      <div
        className={cn(
          "flex flex-wrap lg:w-1/3 justify-center items-center w-full"
        )}
      >
        <div
          className={cn("border uppercase font-bold p-3 text-xl", {
            "border-success-400 text-success-400": victory === "Radiant",
            "border-danger-500 text-danger-500": victory === "Dire",
          })}
        >
          {victory} victory
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 text-2xl font-semibold lg:w-1/3">
        <div className="text-success-400">{radiantScore}</div>
        <div className="flex flex-col items-center">
          <span>{secondsToTime(match?.durationSeconds!)}</span>
          <span className="text-base font-medium text-gray-400">
            {formatDistanceToNow(match?.endDateTime * 1000, {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="text-danger-500">{direScore}</div>
      </div>
      <div className="flex flex-col items-center font-medium lg:w-1/3">
        <div>
          <div>Match ID: {match?.id}</div>
          <div>Region: {getRegionName(match?.regionId)}</div>
        </div>
      </div>
    </section>
  );
}
