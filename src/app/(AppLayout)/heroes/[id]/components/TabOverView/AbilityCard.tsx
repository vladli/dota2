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

import { GetAbilitiesQuery, GetHeroByIdQuery } from "@/graphql/constants";
import { IMAGE, UNIT_DAMAGE_TYPE } from "@/lib/constants";
import { AbilityType } from "@/types/types.generated";

type Props = {
  abilities: GetAbilitiesQuery;
  data: GetHeroByIdQuery;
};

export default function AbilityCard({ abilities, data }: Props) {
  const hero = data.constants?.hero;
  const [selectedAbility, setSelectedAbility] = useState<
    AbilityType | null | undefined
  >(hero?.abilities?.[0]?.ability);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center gap-2">
        {hero?.abilities?.map(
          (ability, index) =>
            ability?.ability?.name !== "generic_hidden" && (
              <div
                key={index}
                onClick={() => setSelectedAbility(ability?.ability)}
              >
                <Image
                  alt=""
                  className={cn("hover:scale-105 cursor-pointer", {
                    grayscale: selectedAbility?.id !== ability?.ability?.id,
                  })}
                  draggable={false}
                  src={IMAGE.urlAbility + ability?.ability?.name + ".png"}
                  width={120}
                />
              </div>
            )
        )}
      </div>
      {abilities && selectedAbility ? (
        <AbilityDescription ability={selectedAbility} />
      ) : null}
    </div>
  );
}

const AbilityDescription = ({ ability }: { ability: AbilityType }) => {
  return (
    <section className="flex justify-center">
      <Card className="max-w-[60rem] border-1 border-neutral-800 bg-transparent shadow-none">
        <CardHeader className="gap-2">
          <Image
            alt=""
            className="min-w-[120px]"
            draggable={false}
            src={IMAGE.urlAbility + ability?.name + ".png"}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold uppercase">
              {ability.language?.displayName}
            </h1>
            {ability.language?.description ? (
              <div
                className="font-medium"
                dangerouslySetInnerHTML={{
                  __html: ability.language?.description!,
                }}
              />
            ) : null}
          </div>
        </CardHeader>
        <CardBody className="bg-content1">
          {/* <Ability
            text={ability.stat}
            title="Ability:"
          /> */}
          {ability.stat?.spellImmunity !== 0 && (
            <Ability
              text={ability.stat?.spellImmunity === 3 ? "Yes" : "No"}
              title="PIERCES SPELL IMMUNITY:"
            />
          )}
          {ability.stat?.unitDamageType !== 0 && (
            <Ability
              text={UNIT_DAMAGE_TYPE[ability.stat?.unitDamageType!]}
              title="DAMAGE TYPE:"
            />
          )}
          {(ability.stat?.hasScepterUpgrade ||
            ability.stat?.isGrantedByScepter) && (
            <AghanimDescription
              text={ability.language?.aghanimDescription!}
              type="Aghanim"
            />
          )}
          {(ability.stat?.hasShardUpgrade ||
            ability.stat?.isGrantedByShard) && (
            <AghanimDescription
              text={ability.language?.shardDescription!}
              type="Shard"
            />
          )}
          <section className="mt-2">
            {ability.language?.attributes
              ?.filter((attribute) => !attribute?.includes(":%"))
              .map((attribute) => (
                <Ability
                  key={attribute}
                  text={attribute}
                />
              ))}
          </section>
          <section className="relative mt-4 flex w-full">
            {ability.stat?.cooldown && (
              <div className="flex items-center gap-2 place-self-start">
                <Image
                  alt=""
                  className="size-4"
                  draggable={false}
                  radius="none"
                  src="/img/hero_stats/cooldown.png"
                />
                <HealthMana text={ability.stat?.cooldown} />
              </div>
            )}
            {ability.stat?.manaCost && (
              <div className="ml-auto flex place-content-end items-center gap-2">
                <div className="size-4 bg-gradient-to-b from-[#00A4DB] to-[#007196]" />
                <HealthMana text={ability.stat.manaCost} />{" "}
              </div>
            )}
          </section>
        </CardBody>
        {ability.language?.lore && (
          <CardFooter className="items-end italic">
            {ability.language?.lore}
          </CardFooter>
        )}
      </Card>
    </section>
  );
};

const Ability = ({
  title,
  text,
}: {
  title?: string;
  text: string | string[] | null;
}) => {
  return (
    <div className="flex gap-1">
      {title ? (
        <span className="font-semibold uppercase text-foreground-300">
          {title}
        </span>
      ) : null}
      {Array.isArray(text) ? (
        text.map((item, index) => (
          <span
            className="font-medium"
            key={index}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: item!,
              }}
            />
            {index !== text.length - 1 && " /"}
          </span>
        ))
      ) : (
        <span
          className="font-medium"
          dangerouslySetInnerHTML={{
            __html: text!,
          }}
        />
      )}
    </div>
  );
};

const AghanimDescription = ({
  type,
  text,
}: {
  type: "Aghanim" | "Shard";
  text: string;
}) => {
  return (
    <section className="my-4 flex flex-col gap-1 rounded-medium bg-gradient-to-r from-blue-500/30 to-blue-500/50 p-2">
      <h1 className="font-semibold uppercase">
        {type === "Aghanim" ? "Scepter Upgrade" : "Shard Upgrade"}
      </h1>
      <span className="font-medium text-gray-300">{text}</span>
    </section>
  );
};

const HealthMana = ({ text }: { img?: string; text: (number | null)[] }) => {
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
