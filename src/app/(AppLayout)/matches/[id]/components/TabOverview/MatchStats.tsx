import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";

import MatchGraph from "./MatchGraph";
import MatchMap from "./MatchMap";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function MatchStats({ data, heroes }: Props) {
  return (
    <section className="mt-4 rounded-large bg-content1 p-4">
      <h1 className="text-xl font-semibold uppercase">Stats</h1>
      <div className="mt-4 flex w-full flex-col items-center justify-around gap-1 lg:flex-row">
        <MatchMap data={data} />
        <MatchGraph
          data={data}
          heroes={heroes}
        />
      </div>
    </section>
  );
}
