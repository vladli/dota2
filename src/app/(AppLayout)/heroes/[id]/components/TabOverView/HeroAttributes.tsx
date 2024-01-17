import { Image } from "@nextui-org/react";

import { GetHeroByIdQuery } from "@/graphql/constants";
import { HERO_STATS, IMAGE } from "@/lib/constants";

type Props = {
  data: GetHeroByIdQuery;
};

export default function HeroAttributes({ data }: Props) {
  const hero = data.constants?.hero;
  const HeroAttr = [
    {
      attr: hero?.stats?.strengthBase,
      img: "/img/hero_type/hero_strength.png",
      gainPerLevel: hero?.stats?.strengthGain,
    },
    {
      attr: hero?.stats?.agilityBase,
      img: "/img/hero_type/hero_agility.png",
      gainPerLevel: hero?.stats?.agilityGain,
    },
    {
      attr: hero?.stats?.intelligenceBase,
      img: "/img/hero_type/hero_intelligence.png",
      gainPerLevel: hero?.stats?.intelligenceGain,
    },
  ];
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold uppercase">Attributes</h1>
      <section className="flex flex-col items-center gap-4 md:flex-row">
        <div className="flex flex-col">
          <Image
            alt="hero"
            draggable={false}
            radius="none"
            src={IMAGE.url + hero?.shortName + IMAGE.horizontal}
            width={200}
          />
          <div className="relative flex items-center justify-center bg-green-600">
            {HERO_STATS.baseHp +
              HERO_STATS.strengthHp * hero?.stats?.strengthBase!}
            <span className="absolute right-1">
              +
              {(
                hero?.stats?.hpRegen! +
                +hero?.stats?.strengthBase! * HERO_STATS.strengthHpRegen
              ).toFixed(1)}
            </span>
          </div>
          <div className="relative flex items-center justify-center bg-blue-600">
            {HERO_STATS.baseMana +
              HERO_STATS.intelligenceMana * hero?.stats?.intelligenceBase!}
            <span className="absolute right-1">
              +
              {(
                hero?.stats?.mpRegen! +
                +hero?.stats?.intelligenceBase! *
                  HERO_STATS.intelligenceManaRegen
              ).toFixed(1)}
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
                draggable={false}
                src={img}
                width={32}
              />
              <span className="text-xl font-bold">{attr}</span>
              <span className="text-lg font-semibold text-foreground-500">
                +{gainPerLevel?.toFixed(1)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
