import { GetAbilitiesQuery, GetHeroByIdQuery } from "@/graphql/constants";

import AbilityCard from "./AbilityCard";

type Props = {
  data: GetHeroByIdQuery;
  abilities: GetAbilitiesQuery;
};

export default function HeroAbilities({ data, abilities }: Props) {
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
