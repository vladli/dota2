import type { Metadata } from "next/types";

import { GetAllHeroesDocument } from "@/graphql/constants";
import { GetHeroesStatsDocument } from "@/graphql/heroStats";
import { getClient } from "@/lib/client";
import { InputMaybe, RankBracket } from "@/types/types.generated";

import HeroesTable from "./HeroesTable";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Heroes",
};

type Props = {
  searchParams: {
    days?: string;
    rank?: string;
    position?: string;
  };
};

export default async function page({ searchParams }: Props) {
  const isRankValid = Object.values(RankBracket).includes(
    searchParams.rank?.toUpperCase() as RankBracket
  );
  const isValidDays =
    !searchParams.days ||
    (parseInt(searchParams.days) > 1 && parseInt(searchParams.days) <= 30);

  const { data: heroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const { data } = await getClient().query({
    query: GetHeroesStatsDocument,
    variables: {
      bracketIds: isRankValid
        ? [searchParams.rank?.toUpperCase() as InputMaybe<RankBracket>]
        : undefined,
      take:
        !searchParams.days || !isValidDays ? 7 : parseInt(searchParams.days),
    },
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
    const statistic = heroStats(hero?.id);
    return { ...hero, statistic };
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
