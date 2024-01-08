import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/mathch";

import PickPhase from "./PickPhase";
import PlayerBans from "./PlayerBans";
import SystemBans from "./SystemBans";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function PickBan({ data, heroes }: Props) {
  const getHeroById = (id: number) =>
    heroes?.constants?.heroes?.find((hero) => hero?.id === id);
  const playerBans = data?.match?.pickBans?.filter(
    (hero) => hero?.playerIndex !== null && hero?.bannedHeroId !== null
  );
  return (
    <section className="mt-4 rounded-large bg-content1 p-4">
      <h1 className="text-xl font-semibold uppercase">Draft</h1>
      <div className="mt-4 flex w-full flex-col items-center gap-2 xl:flex-row">
        <PlayerBans
          data={data}
          heroes={heroes}
        />
        <SystemBans
          data={data}
          heroes={heroes}
        />
        <PickPhase
          data={data}
          heroes={heroes}
          phase={1}
        />
        <PickPhase
          data={data}
          heroes={heroes}
          phase={2}
        />
        <PickPhase
          data={data}
          heroes={heroes}
          phase={3}
        />
      </div>
    </section>
  );
}
