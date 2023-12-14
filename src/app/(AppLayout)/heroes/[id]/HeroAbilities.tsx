import {
  getAbilities,
  getAganimDescription,
  getHeroAbilities,
} from "@/actions/actions";
import { IHero } from "@/types/types";

import AbilityCard from "./components/AbilityCard";
type Props = {
  hero: IHero;
};

export default async function HeroAbilities({ hero }: Props) {
  const abilities = await getAbilities();
  const data = await getHeroAbilities(hero.name);
  const heroAghanim = await getAganimDescription(hero.name);

  return (
    <section className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-xl font-semibold uppercase">Ability Details</h1>
      <AbilityCard
        abilities={abilities}
        aghanim={heroAghanim}
        data={data}
      />
    </section>
  );
}
