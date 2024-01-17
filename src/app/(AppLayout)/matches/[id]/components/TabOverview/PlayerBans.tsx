import { cn } from "@nextui-org/react";

import PlayerName from "@/components/PlayerName";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";

import BanItem from "./PickBanItem";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function PlayerBans({ data, heroes }: Props) {
  const getHeroById = (id: number) =>
    heroes?.constants?.heroes?.find((hero) => hero?.id === id);
  const playerBans = data?.match?.pickBans?.filter(
    (hero) => hero?.playerIndex !== null && hero?.bannedHeroId !== null
  );
  return (
    <div className="w-full min-w-fit max-w-[30rem] rounded-large bg-black p-4 xl:max-w-[20rem]">
      <h1 className="mb-1 text-sm font-semibold text-foreground-500">
        Player Bans
      </h1>
      <div className="grid grid-cols-5 place-items-center gap-4">
        {playerBans?.map((hero) => (
          <BanItem
            heroShortName={getHeroById(hero?.bannedHeroId)?.shortName}
            key={hero?.bannedHeroId}
            tooltipText={
              <div>
                <span className="font-semibold text-foreground-500">
                  {getHeroById(hero?.bannedHeroId)?.displayName}
                </span>{" "}
                was nominated for ban by{" "}
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
            type="ban"
            wasBannedSuccessfully={hero?.wasBannedSuccessfully}
          />
        ))}
      </div>
    </div>
  );
}
