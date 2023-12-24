import { GetAllHeroesQuery } from "@/graphql/constants";

import DaysFilter from "./filters/DaysFilter";
import HeroesFilter from "./filters/HeroesFilter";

type Props = {
  heroes: GetAllHeroesQuery;
};
export default function Filters({ heroes }: Props) {
  return (
    <section className="mb-4 flex items-center gap-2">
      <HeroesFilter heroes={heroes} />
      <DaysFilter />
    </section>
  );
}
