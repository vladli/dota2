import { Card, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetPlayerBySteamIdQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { getHero, getHeroTier } from "@/lib/utils";

import TableTitle from "./TableTitle";

type Props = {
  allHeroes: GetAllHeroesQuery;
  data: GetPlayerBySteamIdQuery;
};

export default function DotaPlus({ allHeroes, data }: Props) {
  if (!data?.player?.dotaPlus?.length) return null;
  const topHeroes = data.player?.dotaPlus?.toSorted(
    (a, b) => b?.level - a?.level
  );
  const highestLevelsMap = new Map();
  if (topHeroes && topHeroes.length > 0) {
    topHeroes.forEach((hero) => {
      const heroId = hero?.heroId;
      const heroLevel = hero?.level;
      if (
        !highestLevelsMap.has(heroId) ||
        heroLevel > highestLevelsMap.get(heroId)
      ) {
        highestLevelsMap.set(heroId, heroLevel);
      }
    });
  }
  return (
    <div className="flex grow flex-col gap-2 rounded-large bg-content1 p-4">
      <TableTitle>DotaPlus Top Heroes</TableTitle>
      <div className="flex flex-wrap justify-around gap-2">
        {[...highestLevelsMap]?.slice(0, 8)?.map(([heroId, highestLevel]) => (
          <HeroCard
            allHeroes={allHeroes}
            heroId={heroId}
            key={heroId}
            level={highestLevel}
          />
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  allHeroes: GetAllHeroesQuery;
  heroId: number;
  level: number;
};

function HeroCard({ allHeroes, heroId, level }: CardProps) {
  const hero = getHero(heroId, allHeroes);
  return (
    <Card
      as={Link}
      className="flex justify-center p-2"
      href={`/heroes/${heroId}`}
      isPressable
    >
      <div className="absolute size-full">
        <NextImage
          alt=""
          className="object-cover blur-[60px]"
          fill
          src={getHeroTier(level)?.image || ""}
          unoptimized
        />
      </div>
      <Image
        alt=""
        className="border-b-1 border-divider"
        radius="none"
        src={IMAGE.url + hero?.shortName + IMAGE.model}
        width={200}
      />
      <div className="relative flex justify-center">
        <Image
          alt=""
          src={getHeroTier(level)?.image}
          width={50}
        />
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 font-black ">
          {level}
        </span>
      </div>
      <p className="text-center text-large font-semibold">
        {hero?.displayName}
      </p>
    </Card>
  );
}
