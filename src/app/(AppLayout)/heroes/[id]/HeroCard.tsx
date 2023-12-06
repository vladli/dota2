import { Image } from "@nextui-org/react";

import { HERO_STATS, STEAM_IMAGE } from "@/lib/constants";
import { IHero } from "@/types/types";

type Props = {
  hero: IHero;
};

export default function HeroCard({ hero }: Props) {
  return (
    <div className="pl-10">
      <section>
        <Image
          alt="hero"
          src={STEAM_IMAGE + hero.img}
        />
        <div className="flex items-center justify-center bg-green-600">
          {hero.base_health + HERO_STATS.strengthHp * hero.base_str}
        </div>
        <div className="flex items-center justify-center bg-blue-600">
          {hero.base_mana + HERO_STATS.intelligenceMana * hero.base_int}
        </div>
      </section>
    </div>
  );
}
