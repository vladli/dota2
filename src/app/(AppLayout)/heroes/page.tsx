import type { Metadata } from "next/types";

import { GetAllHeroesDocument } from "@/graphql/constants";
import { GetHeroesStatsDocument } from "@/graphql/heroStats";
import { getClient } from "@/lib/client";

import HeroesTable from "./HeroesTable";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Heroes",
};

type Props = {
  searchParams: {
    heroId?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const { data: heroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const { data } = await getClient().query({
    query: GetHeroesStatsDocument,
    variables: { take: 5 },
  });
  const sortedHeroes = heroes?.constants?.heroes?.toSorted((a, b) => {
    if (a?.displayName && b?.displayName) {
      return a.displayName.localeCompare(b.displayName);
    }
    return 0;
  });
  const heroStats = (heroId: number) => {
    const hero = data?.heroStats!.winDay!.filter((h) => h?.heroId === heroId);
    return hero.sort((a, b) => a?.day - b?.day);
  };
  const updatedHeroes = sortedHeroes?.map((hero) => {
    const stats = heroStats(hero?.id);
    return { ...hero, stats };
  });
  const result = {
    ...heroes,
    constants: { ...heroes.constants, heroes: updatedHeroes },
  };
  return (
    <main className="p-4">
      <HeroesTable heroes={result} />
    </main>
  );
}
