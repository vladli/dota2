import type { Metadata } from "next";

import { GetAllHeroesDocument } from "@/graphql/constants";
import { getClient } from "@/lib/client";

import HeroesTable from "./HeroesTable";

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
  const { data } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const all = filterAndSortHeroes(data.constants?.heroes, "all");
  const agility = filterAndSortHeroes(data.constants?.heroes, "agi");
  const intelligence = filterAndSortHeroes(data.constants?.heroes, "int");
  const strength = filterAndSortHeroes(data.constants?.heroes, "str");
  return (
    <main className="my-auto flex w-full justify-center p-4">
      <section className="grid max-w-7xl grid-cols-1 gap-10 xl:grid-cols-2">
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
      </section>
    </main>
  );
}
