import { GetAbilitiesQuery, GetHeroByIdQuery } from "@/graphql/constants";

import AbilityCard from "./AbilityCard";

type Props = {
  data: GetHeroByIdQuery;
  abilities: GetAbilitiesQuery;
};

export default function HeroAbilities({ data, abilities }: Props) {
  return (
    <section className="flex flex-col items-center gap-2 p-4">
      <h2 className="uppercase">Ability Details</h2>
      <AbilityCard
        abilities={abilities}
        data={data}
      />
    </section>
  );
}
