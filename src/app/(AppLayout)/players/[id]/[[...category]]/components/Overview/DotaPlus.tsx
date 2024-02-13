"use client";
import { useQuery } from "@apollo/client";
import { Card, Image } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import DotaPlusImage from "@/components/DotaPlusImage";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetPlayerDotaPlusDocument } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { getDotaPlus, getHero, getHeroTier } from "@/lib/utils";

import TableTitle from "./TableTitle";

type Props = {
  allHeroes: GetAllHeroesQuery;
  steamId: string;
};

export default function DotaPlus({ allHeroes, steamId }: Props) {
  const { data } = useQuery(GetPlayerDotaPlusDocument, {
    variables: { steamAccountId: Number(steamId) },
  });
  if (!data?.player?.dotaPlus?.length) return null;

  return (
    <Container className="flex grow flex-col gap-2">
      <TableTitle>DotaPlus Top Heroes</TableTitle>
      <div className="flex flex-wrap justify-around gap-2">
        {getDotaPlus(data?.player?.dotaPlus)
          ?.slice(0, 8)
          ?.map(([heroId, highestLevel]: [number, number]) => (
            <HeroCard
              allHeroes={allHeroes}
              heroId={heroId}
              key={heroId}
              level={highestLevel}
            />
          ))}
      </div>
    </Container>
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
      <div className="flex justify-center">
        <DotaPlusImage level={level} />
      </div>
      <p className="text-center text-large font-semibold">
        {hero?.displayName}
      </p>
    </Card>
  );
}
