import { GetAbilitiesDocument, GetHeroByIdQuery } from "@/graphql/constants";
import { getClient } from "@/lib/client";

import AbilityCard from "./components/AbilityCard";

type Props = {
  data: GetHeroByIdQuery;
};

export default async function HeroAbilities({ data }: Props) {
  const { data: abilities } = await getClient().query({
    query: GetAbilitiesDocument,
  });

  return (
    <section className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-xl font-semibold uppercase">Ability Details</h1>
      <AbilityCard
        abilities={abilities}
        data={data}
      />
    </section>
  );
}
