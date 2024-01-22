import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";

import BanItem from "./PickBanItem";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function SystemBans({ data, heroes }: Props) {
  const getHeroById = (id: number) =>
    heroes?.constants?.heroes?.find((hero) => hero?.id === id);
  const systemBans = data?.match?.pickBans?.filter(
    (hero) => hero?.playerIndex == null && hero?.bannedHeroId !== null
  );
  return (
    <section className="w-full max-w-[30rem] rounded-large bg-black p-4">
      <h3 className="mb-1 text-sm font-semibold text-foreground-500">
        Auto Bans
      </h3>
      <div className="flex flex-wrap gap-4">
        {systemBans?.map((hero) => (
          <BanItem
            heroShortName={getHeroById(hero?.bannedHeroId)?.shortName}
            key={hero?.bannedHeroId}
            tooltipText={
              <div>
                <span className="font-semibold text-foreground-500">
                  {getHeroById(hero?.bannedHeroId)?.displayName}
                </span>{" "}
                was auto banned
              </div>
            }
            type="ban"
            wasBannedSuccessfully={hero?.wasBannedSuccessfully}
          />
        ))}
      </div>
    </section>
  );
}
