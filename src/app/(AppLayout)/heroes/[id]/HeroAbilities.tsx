"use client";
import { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { getAbilities, getHeroAbilities } from "@/actions/actions";
import { STEAM_IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { IAbility, IHero } from "@/types/types";
type Props = {
  hero: IHero;
};

export default function HeroAbilities({ hero }: Props) {
  const { data: abilities } = useQuery({
    queryKey: ["abilities"],
    queryFn: () => getAbilities(),
  });
  const { data } = useQuery({
    queryKey: ["hero", hero.name],
    queryFn: () => getHeroAbilities(hero.name),
  });
  const [selectedAbility, setSelectedAbility] = useState<string | null>(null);
  return (
    <section className="flex flex-col items-center gap-2 p-4">
      <h1 className="text-xl font-semibold uppercase">Ability Details</h1>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2">
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
        </div>
        {abilities && selectedAbility && (
          <AbilityDescription
            abilities={abilities}
            selectedAbility={selectedAbility}
          />
        )}
      </div>
    </section>
  );
}
const AbilityDescription = ({
  abilities,
  selectedAbility,
}: {
  abilities: IAbility;
  selectedAbility: string;
}) => {
  const ability = abilities[selectedAbility];
  return (
    <section className="flex justify-center">
      <Card className="">
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
          <CardFooter className="font-medium">{ability.lore}</CardFooter>
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
