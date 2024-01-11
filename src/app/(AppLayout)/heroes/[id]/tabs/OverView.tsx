import { Divider } from "@nextui-org/react";

import { GetAbilitiesQuery, GetHeroByIdQuery } from "@/graphql/constants";

import HeroAbilities from "../components/TabOverView/HeroAbilities";
import HeroAttributes from "../components/TabOverView/HeroAttributes";
import HeroStats from "../components/TabOverView/HeroStats";
import HeroTalents from "../components/TabOverView/HeroTalents";

type Props = {
  data: GetHeroByIdQuery;
  abilities: GetAbilitiesQuery;
};
export default function OverView({ data, abilities }: Props) {
  return (
    <main>
      <Divider />
      <section className="flex w-full justify-evenly">
        <div className="flex">
          <HeroAttributes data={data} />
        </div>
        <div>
          <Divider orientation="vertical" />
        </div>
        <HeroStats data={data} />
      </section>
      <Divider />
      <section className="flex justify-center">
        <HeroTalents
          abilities={abilities}
          data={data}
        />
      </section>
      <Divider />
      <section className="flex flex-col items-center justify-around">
        <HeroAbilities
          abilities={abilities}
          data={data}
        />
      </section>
    </main>
  );
}
