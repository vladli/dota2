"use client";

import { useQuery } from "@tanstack/react-query";

import { getAbilities, getHeroAbilities } from "@/actions/actions";
import { IHero } from "@/types/types";

type Props = {
  hero: IHero;
};
export default function HeroTalents({ hero }: Props) {
  const { data: abilities } = useQuery({
    queryKey: ["abilities"],
    queryFn: () => getAbilities(),
  });
  const { data } = useQuery({
    queryKey: ["hero", hero.name],
    queryFn: () => getHeroAbilities(hero.name),
  });
  if (!abilities || !data) return null;
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold uppercase">Talents</h1>
      <section className="grid grid-rows-4">
        <Talent
          left={abilities[data.talents[7].name].dname}
          level={25}
          right={abilities[data.talents[6].name].dname}
        />
        <Talent
          left={abilities[data.talents[5].name].dname}
          level={20}
          right={abilities[data.talents[4].name].dname}
        />
        <Talent
          left={abilities[data.talents[3].name].dname}
          level={15}
          right={abilities[data.talents[2].name].dname}
        />
        <Talent
          left={abilities[data.talents[1].name].dname}
          level={10}
          right={abilities[data.talents[0].name].dname}
        />
      </section>
    </section>
  );
}

const Talent = ({
  left,
  right,
  level,
}: {
  left: string;
  right: string;
  level: number;
}) => {
  return (
    <div className="grid grid-cols-11">
      <div className="col-span-5 flex items-center justify-center border p-2">
        {left}
      </div>
      <div className="col-span-1 flex items-center justify-center border p-2 font-bold text-yellow-500">
        {level}
      </div>
      <div className="col-span-5 flex items-center  justify-center border p-2">
        {right}
      </div>
    </div>
  );
};
