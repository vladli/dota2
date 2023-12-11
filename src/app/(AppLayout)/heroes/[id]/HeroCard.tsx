import { Image } from "@nextui-org/react";

import { HERO_ATTRIBUTE, STEAM_IMAGE } from "@/lib/constants";
import { IHero } from "@/types/types";

type Props = {
  hero: IHero;
};

export default function HeroCard({ hero }: Props) {
  return (
    <section className="mx-10 flex items-center gap-4">
      <Image
        alt="hero"
        src={STEAM_IMAGE + hero.img}
      />
      <div className="">
        <h2 className="flex items-center gap-1 text-lg font-medium uppercase">
          <Image
            alt="icon"
            height={24}
            src={
              HERO_ATTRIBUTE[hero.primary_attr as keyof typeof HERO_ATTRIBUTE]
                .img
            }
            width={24}
          />
          {
            HERO_ATTRIBUTE[hero.primary_attr as keyof typeof HERO_ATTRIBUTE]
              .name
          }
        </h2>
        <h1 className="text-3xl font-semibold">{hero.localized_name}</h1>
        <h2 className="flex flex-wrap gap-2 font-medium text-foreground-500">
          {hero.roles.map((role, index) => (
            <div key={role}>
              {role}
              {index !== hero.roles.length - 1 && ","}
            </div>
          ))}
        </h2>
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <Image
            alt=""
            radius="none"
            src={`/img/hero_stats/${hero.attack_type}.svg`}
            width={24}
          />
          {hero.attack_type}
        </h3>
      </div>
    </section>
  );
}
