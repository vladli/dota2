import { Image } from "@nextui-org/react";

import { HERO_STATS, STEAM_IMAGE } from "@/lib/constants";
import { IHero } from "@/types/types";

type Props = {
  hero: IHero;
};

export default function HeroAttributes({ hero }: Props) {
  const HeroAttr = [
    {
      attr: hero.base_str,
      img: "/img/hero_type/hero_strength.png",
      gainPerLevel: hero.str_gain,
    },
    {
      attr: hero.base_agi,
      img: "/img/hero_type/hero_agility.png",
      gainPerLevel: hero.agi_gain,
    },
    {
      attr: hero.base_int,
      img: "/img/hero_type/hero_intelligence.png",
      gainPerLevel: hero.int_gain,
    },
  ];
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-medium uppercase">Attributes</h1>
      <section className="flex flex-col items-center gap-4 md:flex-row">
        <div>
          <Image
            alt="hero"
            className="max-w-[200px]"
            radius="none"
            src={STEAM_IMAGE + hero.img}
          />
          <div className="relative flex items-center justify-center bg-green-600">
            {hero.base_health + HERO_STATS.strengthHp * hero.base_str}
            <span className="absolute right-1">
              +
              {hero.base_health_regen +
                +(hero.base_str * HERO_STATS.strengthHpRegen).toFixed(1)}
            </span>
          </div>
          <div className="relative flex items-center justify-center bg-blue-600">
            {hero.base_mana + HERO_STATS.intelligenceMana * hero.base_int}
            <span className="absolute right-1">
              +
              {hero.base_mana_regen +
                +(hero.base_int * HERO_STATS.intelligenceManaRegen).toFixed(1)}
            </span>
          </div>
        </div>
        <div className="my-auto flex flex-col gap-4">
          {HeroAttr.map(({ attr, img, gainPerLevel }, i) => (
            <div
              className="flex items-center gap-2"
              key={i}
            >
              <Image
                alt=""
                className="min-w-[18px]"
                src={img}
                width={32}
              />
              <span className="text-xl font-bold">{attr}</span>
              <span className="text-lg font-semibold text-foreground-500">
                +{gainPerLevel}
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
