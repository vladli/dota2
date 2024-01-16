import type { Metadata } from "next";

import { GetAllHeroesDocument } from "@/graphql/constants";
import { HeroesOverviewDocument } from "@/graphql/heroStats";
import { getClient } from "@/lib/client";

import HeroesTable from "./HeroesTable";
import PositionCard from "./PositionCard";

export const metadata: Metadata = {
  title: "All Heroes",
};

const filterAndSortHeroes = (
  heroes: any | undefined,
  primaryAttribute: string
) => {
  if (!heroes) {
    return undefined;
  }
  const filteredHeroes = heroes.filter(
    (hero: any) => hero?.stats?.primaryAttribute === primaryAttribute
  );
  return filteredHeroes.sort((a: any, b: any) => {
    const nameA = a?.displayName?.toLowerCase() || "";
    const nameB = b?.displayName?.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
};

export default async function page() {
  const { data: allHeroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const { data } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const { data: heroOverview } = await getClient().query({
    query: HeroesOverviewDocument,
  });
  const all = filterAndSortHeroes(data.constants?.heroes, "all");
  const agility = filterAndSortHeroes(data.constants?.heroes, "agi");
  const intelligence = filterAndSortHeroes(data.constants?.heroes, "int");
  const strength = filterAndSortHeroes(data.constants?.heroes, "str");
  return (
    <main className="flex w-full flex-col items-center gap-y-4 p-4">
      <div className="flex w-full justify-center">
        <PositionCard
          allHeroes={allHeroes}
          data={heroOverview}
        />
      </div>
      <section className="flex w-full justify-center">
        <div className="grid w-full max-w-7xl grid-cols-1 justify-center gap-10 xl:grid-cols-2">
          <HeroesTable
            data={strength}
            header="Strength"
          />
          <HeroesTable
            data={agility}
            header="Agility"
          />
          <HeroesTable
            data={intelligence}
            header="Intelligence"
          />
          <HeroesTable
            data={all}
            header="Universal"
          />
        </div>
      </section>
    </main>
  );
}
