import { Image } from "@nextui-org/react";

import Tooltip from "@/components/Tooltip";
import { GetHeroByIdQuery } from "@/graphql/constants";

type Props = {
  data: GetHeroByIdQuery;
};

export default function HeroStats({ data }: Props) {
  const hero = data.constants?.hero;

  const Attack = [
    {
      name: "Damage",
      value: (
        <>
          {hero?.stats?.startingDamageMin} - {hero?.stats?.startingDamageMax}
        </>
      ),
      img: "/img/hero_stats/icon_damage.png",
    },
    {
      name: "Attack Time",
      value: hero?.stats?.attackRate?.toFixed(1),
      img: "/img/hero_stats/icon_attack_time.png",
    },
    {
      name: "Attack Range",
      value: hero?.stats?.attackRange,
      img: "/img/hero_stats/icon_attack_range.png",
    },
  ];
  const Defense = [
    {
      name: "Armor",
      value: hero?.stats?.startingArmor!.toFixed(1),
      img: "/img/hero_stats/icon_armor.png",
    },
    {
      name: "Magic Resist",
      value: hero?.stats?.startingMagicArmor + "%",
      img: "/img/hero_stats/icon_magic_resist.png",
    },
  ];
  const Mobility = [
    {
      name: "Move Speed",
      value: hero?.stats?.moveSpeed,
      img: "/img/hero_stats/icon_movement_speed.png",
    },
    {
      name: "Vision",
      value: (
        <>
          {hero?.stats?.visionDaytimeRange}/{hero?.stats?.visionNighttimeRange}
        </>
      ),
      img: "/img/hero_stats/icon_vision.png",
    },
  ];
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h2 className="uppercase">Stats</h2>
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
      <div className="flex cursor-help items-center gap-1 place-self-start font-medium">
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
  return <h3 className="mb-2 font-medium uppercase">{value}</h3>;
};
