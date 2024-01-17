import { cn } from "@nextui-org/react";

import PlayerName from "@/components/PlayerName";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";

import PickBanItem from "./PickBanItem";

type Props = {
  phase: number;
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function PickPhase({ phase, data, heroes }: Props) {
  const getHeroById = (id: number) =>
    heroes?.constants?.heroes?.find((hero) => hero?.id === id);
  const playerPicks = data?.match?.pickBans?.filter(
    (hero) => hero?.isPick && hero?.playerIndex !== null
  );
  let phasePicks: typeof playerPicks = [];

  if (phase === 1) {
    phasePicks = playerPicks!.slice(0, 4);
  } else if (phase === 2) {
    phasePicks = playerPicks!.slice(4, 8);
  } else if (phase === 3) {
    phasePicks = playerPicks!.slice(8, 10);
  }
  return (
    <div className="w-full max-w-[30rem] rounded-large bg-black p-4 lg:max-w-[8rem]">
      <h1 className="mb-1 text-sm font-semibold text-foreground-500">
        Pick Phase {phase}
      </h1>
      <div
        className={cn("grid grid-cols-1 place-items-center gap-4", {
          "grid-cols-2": phase !== 3,
        })}
      >
        {phasePicks?.map((hero) => (
          <PickBanItem
            heroShortName={getHeroById(hero?.heroId)?.shortName}
            key={hero?.heroId}
            tooltipText={
              <div>
                <span className="font-semibold text-foreground-500">
                  {getHeroById(hero?.heroId)?.displayName}
                </span>{" "}
                was picked by{" "}
                <span
                  className={cn("text-danger-500 font-semibold", {
                    "text-success-400":
                      data.match?.players?.[hero?.playerIndex || 0]?.isRadiant,
                  })}
                >
                  <PlayerName
                    isLink={false}
                    showProIcon={false}
                    steamAccount={
                      data?.match?.players?.[hero?.playerIndex || 0]
                        ?.steamAccount
                    }
                  />
                </span>
              </div>
            }
            type="pick"
          />
        ))}
      </div>
    </div>
  );
}
