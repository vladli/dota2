import { formatDistanceToNow } from "date-fns";

import { REGION } from "@/lib/constants";
import { cn, secondsToTime } from "@/lib/utils";
import { IMatchDetails } from "@/types/types";

type Props = {
  data: IMatchDetails;
};
export default function MatchCard({ data }: Props) {
  const victory = data.radiant_win ? "Radiant" : "Dire";
  return (
    <section className="mt-10 flex flex-col items-center justify-around gap-4 lg:flex-row">
      <div
        className={cn(
          "flex flex-wrap lg:w-1/3 justify-center items-center w-full"
        )}
      >
        <div
          className={cn("border uppercase font-bold p-3 text-xl", {
            "border-emerald-500 text-emerald-500": victory === "Radiant",
            "border-red-500 text-red-500": victory === "Dire",
          })}
        >
          {victory} victory
        </div>
      </div>
      <div className="flex items-center justify-center gap-10 text-2xl font-semibold lg:w-1/3">
        <div className="text-emerald-500">{data.radiant_score}</div>
        <div className="flex flex-col items-center">
          <span>{secondsToTime(data.duration)}</span>
          <span className="text-base font-medium text-gray-400">
            {formatDistanceToNow(data.start_time * 1000, {
              addSuffix: true,
            })}
          </span>
        </div>
        <div className="text-red-500">{data.dire_score}</div>
      </div>
      <div className="flex flex-col items-center font-medium lg:w-1/3">
        <div>
          <div>Match ID: {data.match_id}</div>
          <div>
            Region: {REGION[data.region.toString() as keyof typeof REGION]}
          </div>
        </div>
      </div>
    </section>
  );
}
