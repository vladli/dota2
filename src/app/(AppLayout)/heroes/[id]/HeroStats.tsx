import { Image, Tooltip } from "@nextui-org/react";

import { HERO_STATS } from "@/lib/constants";
import { getHeroPrimaryAttribute } from "@/lib/utils";
import { IHero } from "@/types/types";

type Props = {
  hero: IHero;
};

export default function HeroStats({ hero }: Props) {
  const baseAttack = getHeroPrimaryAttribute(hero);

  const Attack = [
    {
      name: "Damage",
      value: (
        <>
          {hero.base_attack_min + baseAttack} -{" "}
          {hero.base_attack_max + baseAttack}
        </>
      ),
      img: "/img/hero_stats/icon_damage.png",
    },
    {
      name: "Attack Time",
      value: hero.attack_rate,
      img: "/img/hero_stats/icon_attack_time.png",
    },
    {
      name: "Attack Range",
      value: hero.attack_range,
      img: "/img/hero_stats/icon_attack_range.png",
    },
  ];
  const Defense = [
    {
      name: "Armor",
      value: (
        hero.base_armor +
        HERO_STATS.agilityArmor * hero.base_agi
      ).toFixed(1),
      img: "/img/hero_stats/icon_armor.png",
    },
    {
      name: "Magic Resist",
      value: hero.base_mr + "%",
      img: "/img/hero_stats/icon_magic_resist.png",
    },
  ];
  const Mobility = [
    {
      name: "Move Speed",
      value: hero.move_speed,
      img: "/img/hero_stats/icon_movement_speed.png",
    },
    {
      name: "Vision",
      value: (
        <>
          {hero.day_vision}/{hero.night_vision}
        </>
      ),
      img: "/img/hero_stats/icon_vision.png",
    },
  ];
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold uppercase">Stats</h1>
      <section className="flex w-full flex-col gap-10 md:flex-row">
        <div className="flex flex-col items-center">
          <Heading value="Attack" />
          {Attack.map((stat, index) => (
            <Stat
              key={index}
              {...stat}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <Heading value="Defense" />
          {Defense.map((stat, index) => (
            <Stat
              key={index}
              {...stat}
            />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <Heading value="Mobility" />
          {Mobility.map((stat, index) => (
            <Stat
              key={index}
              {...stat}
            />
          ))}
        </div>
      </section>
    </section>
  );
}

const Stat = ({
  name,
  value,
  img,
}: {
  name: string;
  value: any;
  img: string;
}) => {
  return (
    <Tooltip
      color="primary"
      content={name}
      placement="left"
      showArrow
    >
      <div className="flex items-center gap-1 place-self-start font-medium">
        <Image
          alt=""
          radius="none"
          src={img}
          width={24}
        />
        <span>{value}</span>
      </div>
    </Tooltip>
  );
};

const Heading = ({ value }: { value: string }) => {
  return <h1 className="mb-2 font-medium uppercase">{value}</h1>;
};
