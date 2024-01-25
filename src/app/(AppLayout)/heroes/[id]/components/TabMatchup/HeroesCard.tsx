import { Card } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

import HeroImage from "@/components/HeroImage";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { IMAGE } from "@/lib/constants";
type Props = {
  allHeroes: GetAllHeroesQuery;
  header: string;
  data:
    | ({
        __typename?: "HeroStatsHeroDryadType" | undefined;
        heroId2?: any;
        matchCount?: any;
        synergy?: any;
        winCount?: any;
      } | null)[]
    | undefined;
};

export default function HeroesCard({ allHeroes, data, header }: Props) {
  const getHero = (id: number) =>
    allHeroes?.constants?.heroes?.find((hero) => hero?.id === id);
  return (
    <Card className="flex flex-col gap-4 p-4">
      <h2>{header}</h2>
      {data?.slice(0, 4).map((hero, index) => (
        <CardItem
          heroId={hero?.heroId2}
          heroImage={getHero(hero?.heroId2)?.shortName}
          heroName={getHero(hero?.heroId2)?.displayName}
          index={index + 1}
          key={hero?.heroId2}
          synergy={hero?.synergy}
        />
      ))}
    </Card>
  );
}

type CardItemProps = {
  index: number;
  heroId: number | null | undefined;
  heroName: string | null | undefined;
  heroImage: string | null | undefined;
  synergy: number;
};

function CardItem({
  index,
  heroId,
  heroName,
  heroImage,
  synergy,
}: CardItemProps) {
  return (
    <Link
      className="relative transition-background hover:bg-content2"
      href={`/heroes/${heroId}`}
    >
      <div className="absolute top-0 size-full overflow-hidden">
        <NextImage
          alt=""
          className="blur-[80px]"
          draggable={false}
          fill
          src={IMAGE.url + heroImage + IMAGE.horizontal}
          unoptimized
        />
      </div>
      <section className="flex items-center gap-x-2 rounded-large border border-divider p-2">
        <div className="flex size-8 items-center justify-center rounded-large bg-content2">
          <span>{index}</span>
        </div>
        <div className="flex grow flex-col">
          <span className="font-semibold">{heroName}</span>
          <span className="text-sm font-medium">{synergy.toFixed(1)}%</span>
        </div>

        <HeroImage
          heroId={heroId}
          isLink={false}
          shortName={heroImage}
        />
      </section>
    </Link>
  );
}
