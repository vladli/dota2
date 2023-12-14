"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Image,
} from "@nextui-org/react";

import { STEAM_IMAGE } from "@/lib/constants";
import { findAbilityByDname } from "@/lib/utils";
import {
  IAbility,
  IHeroAbilities,
  IHeroAbility,
  IHeroAghanim,
} from "@/types/types";

type Props = {
  abilities: IHeroAbility;
  aghanim: IHeroAghanim;
  data: IHeroAbilities;
};
export default function AbilityCard({ abilities, aghanim, data }: Props) {
  const [selectedAbility, setSelectedAbility] = useState<string | undefined>(
    data?.abilities?.[0]
  );
  const [heroShard, setHeroShard] = useState<IAbility | null>(
    findAbilityByDname(abilities, aghanim.shard_skill_name)
  );
  const [heroAghs, setHeroAghs] = useState<IAbility | null>(
    findAbilityByDname(abilities, aghanim.scepter_skill_name)
  );
  console.log(data);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        {abilities &&
          data?.abilities?.map(
            (ability, index) =>
              ability !== "generic_hidden" && (
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
              )
          )}
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
          newSkill={aghanim?.scepter_new_skill}
          text={aghanim?.scepter_desc}
          title={aghanim?.scepter_skill_name}
        />
      ) : selectedAbility === "shard" ? (
        <AghanimDescription
          img={heroShard?.img}
          newSkill={aghanim?.shard_new_skill}
          text={aghanim?.shard_desc}
          title={aghanim?.shard_skill_name}
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
  );
}

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
      <Card className="border-1 border-neutral-800 bg-transparent shadow-none">
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
