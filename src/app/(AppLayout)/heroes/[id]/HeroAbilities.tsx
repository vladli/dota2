"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import {
  getAbilities,
  getAganimDescription,
  getHeroAbilities,
} from "@/actions/actions";
import { STEAM_IMAGE } from "@/lib/constants";
import { cn, findAbilityByDname } from "@/lib/utils";
import { IAbility, IHero, IHeroAbility } from "@/types/types";
type Props = {
  hero: IHero;
};

export default function HeroAbilities({ hero }: Props) {
  const { data: abilities } = useQuery({
    queryKey: ["abilities"],
    queryFn: () => getAbilities(),
  });
  const { isLoading, data } = useQuery({
    queryKey: ["hero", hero.name],
    queryFn: () => getHeroAbilities(hero.name),
  });
  const { isLoading: isHeroAghanimLoading, data: heroAghanim } = useQuery({
    queryKey: ["heroAghanim", hero.name],
    queryFn: () => getAganimDescription(hero.name),
  });
  const [selectedAbility, setSelectedAbility] = useState<string | undefined>(
    undefined
  );
  const [heroShard, setHeroShard] = useState<IAbility | null>(null);
  const [heroAghs, setHeroAghs] = useState<IAbility | null>(null);

  useEffect(() => {
    if (!isLoading) setSelectedAbility(data?.abilities[0]);
  }, [isLoading]);
  useEffect(() => {
    if (!isHeroAghanimLoading) {
      setHeroShard(
        findAbilityByDname(abilities, heroAghanim?.shard_skill_name)
      );
      setHeroAghs(
        findAbilityByDname(abilities, heroAghanim?.scepter_skill_name)
      );
    }
  }, [isHeroAghanimLoading]);
  return (
    <section className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-xl font-semibold uppercase">Ability Details</h1>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2">
          {abilities &&
            data?.abilities?.map((ability, index) => (
              <div
                key={index}
                onClick={() => setSelectedAbility(ability)}
              >
                <Image
                  alt=""
                  className={cn("hover:scale-105 cursor-pointer", {
                    grayscale: selectedAbility !== ability,
                  })}
                  src={STEAM_IMAGE + abilities[ability]?.img}
                />
              </div>
            ))}
          {heroAghs && (
            <div
              className="relative"
              onClick={() => setSelectedAbility("aghs")}
            >
              <Image
                alt=""
                className="absolute bottom-1 right-0 z-50"
                removeWrapper
                src="/img/hero_stats/scepter_0.png"
                width={40}
              />
              <Image
                alt=""
                className={cn("hover:scale-105 cursor-pointer", {
                  grayscale: selectedAbility !== "aghs",
                })}
                src={STEAM_IMAGE + heroAghs.img}
              />
            </div>
          )}
          {heroShard && (
            <div
              className="relative"
              onClick={() => setSelectedAbility("shard")}
            >
              <Image
                alt=""
                className="absolute bottom-1 right-0 z-50"
                removeWrapper
                src="/img/hero_stats/shard_0.png"
                width={40}
              />
              <Image
                alt=""
                className={cn("hover:scale-105 cursor-pointer", {
                  grayscale: selectedAbility !== "shard",
                })}
                src={STEAM_IMAGE + heroShard.img}
              />
            </div>
          )}
        </div>
        {abilities && selectedAbility === "aghs" ? (
          <AghanimDescription
            img={heroAghs?.img}
            newSkill={heroAghanim?.scepter_new_skill}
            text={heroAghanim?.scepter_desc}
            title={heroAghanim?.scepter_skill_name}
          />
        ) : selectedAbility === "shard" ? (
          <AghanimDescription
            img={heroShard?.img}
            newSkill={heroAghanim?.shard_new_skill}
            text={heroAghanim?.shard_desc}
            title={heroAghanim?.shard_skill_name}
          />
        ) : (
          abilities &&
          selectedAbility && (
            <AbilityDescription
              abilities={abilities}
              selectedAbility={selectedAbility}
            />
          )
        )}
      </div>
    </section>
  );
}

const AghanimDescription = ({
  img,
  newSkill,
  text,
  title,
}: {
  img: string | undefined;
  newSkill: boolean | undefined;
  text: string | undefined;
  title: string | undefined;
}) => {
  return (
    <section className="flex justify-center">
      <Card>
        <CardHeader className="gap-2">
          <Image
            alt=""
            className="min-w-[120px]"
            src={STEAM_IMAGE + img}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase">{title}</h1>
            <p className="w-fit rounded-md bg-blue-800/50 p-1">
              {newSkill ? "GRANTS NEW ABILITY" : "ABILITY UPGRADE"}
            </p>
            <p className="font-medium">{text}</p>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

const AbilityDescription = ({
  abilities,
  selectedAbility,
}: {
  abilities: IHeroAbility;
  selectedAbility: string;
}) => {
  const ability = abilities[selectedAbility];
  return (
    <section className="flex justify-center">
      <Card>
        <CardHeader className="gap-2">
          <Image
            alt=""
            className="min-w-[120px]"
            src={STEAM_IMAGE + ability?.img}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase">{ability.dname}</h1>
            <p className="font-medium">{ability.desc}</p>
          </div>
        </CardHeader>
        <CardBody className="bg-black">
          <Ability
            text={ability.behavior}
            title="Ability:"
          />
          {ability.bkbpierce && (
            <Ability
              text={ability.bkbpierce}
              title="PIERCES SPELL IMMUNITY:"
            />
          )}
          {ability.dmg_type && (
            <Ability
              text={ability.dmg_type}
              title="DAMAGE TYPE:"
            />
          )}
        </CardBody>
        <CardBody className="flex-col items-start bg-black">
          {ability.attrib.map(({ key, header, value }) => (
            <Ability
              key={key}
              text={value}
              title={header}
            />
          ))}
          <div className="relative flex w-full">
            {ability.cd && (
              <div className="flex items-center gap-2 place-self-start">
                <Image
                  alt=""
                  className="h-4 w-4"
                  radius="none"
                  src="/img/hero_stats/cooldown.png"
                />
                <HealthMana text={ability.cd} />
              </div>
            )}
            {ability.mc && (
              <div className="absolute right-0 flex items-center gap-2">
                <div className="h-4 w-4 bg-gradient-to-b from-[#00A4DB] to-[#007196]" />
                <HealthMana text={ability.mc} />
              </div>
            )}
          </div>
        </CardBody>
        {ability.lore && (
          <CardFooter className="italic">{ability.lore}</CardFooter>
        )}
      </Card>
    </section>
  );
};

const Ability = ({
  title,
  text,
}: {
  title: string;
  text: string | string[];
}) => {
  return (
    <div className="flex gap-1">
      <span className="font-semibold uppercase text-foreground-300">
        {title}
      </span>
      {Array.isArray(text) ? (
        text.map((item, index) => (
          <span
            className="font-medium"
            key={index}
          >
            {item}
            {index !== text.length - 1 && " /"}
          </span>
        ))
      ) : (
        <span className="font-medium">{text}</span>
      )}
    </div>
  );
};

const HealthMana = ({ text }: { img?: string; text: string | string[] }) => {
  return (
    <div className="flex gap-1">
      {Array.isArray(text) ? (
        text.map((item, index) => (
          <span
            className="font-medium"
            key={index}
          >
            {item}
            {index !== text.length - 1 && " /"}
          </span>
        ))
      ) : (
        <span className="font-medium">{text}</span>
      )}
    </div>
  );
};
