import { Image } from "@heroui/react";
import NextImage from "next/image";
import Link from "next/link";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { HeroesOverviewQuery } from "@/graphql/heroStats";
import { IMAGE } from "@/lib/constants";
import { getRoleInfo } from "@/lib/utils";

type Props = {
  allHeroes: GetAllHeroesQuery;
  data: HeroesOverviewQuery;
};

function sortFunction(a: any, b: any) {
  const wirRateA = a?.winCount / a?.matchCount || 0;
  const winRateB = b?.winCount / b?.matchCount || 0;
  return winRateB - wirRateA;
}

export default function PositionCard({ allHeroes, data }: Props) {
  const pos1 = data.heroStats?.POSITION_1?.toSorted(sortFunction);
  const pos2 = data.heroStats?.POSITION_2?.toSorted(sortFunction);
  const pos3 = data.heroStats?.POSITION_3?.toSorted(sortFunction);
  const pos4 = data.heroStats?.POSITION_4?.toSorted(sortFunction);
  const pos5 = data.heroStats?.POSITION_5?.toSorted(sortFunction);
  return (
    <section className="grid max-w-7xl grow grid-cols-5 gap-4">
      <HeroesCard
        allHeroes={allHeroes}
        data={pos1}
        lane="SAFE_LANE"
        role="CORE"
      />
      <HeroesCard
        allHeroes={allHeroes}
        data={pos2}
        lane="MID_LANE"
        role="CORE"
      />
      <HeroesCard
        allHeroes={allHeroes}
        data={pos3}
        lane="OFF_LANE"
        role="CORE"
      />
      <HeroesCard
        allHeroes={allHeroes}
        data={pos4}
        lane="OFF_LANE"
        role="LIGHT_SUPPORT"
      />
      <HeroesCard
        allHeroes={allHeroes}
        data={pos5}
        lane="SAFE_LANE"
        role="HARD_SUPPORT"
      />
    </section>
  );
}

type CardProps = {
  allHeroes: GetAllHeroesQuery;
  role: string;
  lane?: string;
  data:
    | ({
        __typename: "HeroWinDayType";
        heroId: any;
        matchCount: number;
        winCount: number;
      } | null)[]
    | undefined;
};

function HeroesCard({ allHeroes, data, role, lane }: CardProps) {
  const getHero = (id: number) =>
    allHeroes?.constants?.heroes?.find((hero) => hero?.id === id);
  return (
    <div className="relative flex flex-col gap-2">
      <div className="absolute -top-3 z-10 hidden w-full justify-center gap-x-2 font-medium xl:flex">
        <Image
          alt=""
          className=""
          draggable={false}
          height={16}
          radius="none"
          removeWrapper
          src={getRoleInfo(role, lane)?.image || ""}
          width={16}
        />
        {getRoleInfo(role, lane)?.name}
      </div>
      {data
        ?.slice(0, 3)
        .map((hero, index) => (
          <CardItem
            heroId={hero?.heroId}
            heroImage={getHero(hero?.heroId)?.shortName}
            heroName={getHero(hero?.heroId)?.displayName}
            key={hero?.heroId}
            lane={lane}
            role={role}
            winRate={((hero?.winCount || 0) / (hero?.matchCount || 0)) * 100}
          />
        ))}
    </div>
  );
}

type CardItemProps = {
  role: string;
  lane?: string;
  heroId: number | null | undefined;
  heroName: string | null | undefined;
  heroImage: string | null | undefined;
  winRate: number;
};

function CardItem({
  role,
  lane,
  heroId,
  heroName,
  heroImage,
  winRate,
}: CardItemProps) {
  return (
    <Link
      className="relative w-full bg-content1 transition-background hover:bg-content2"
      href={`/heroes/${heroId}`}
    >
      <div className="absolute -top-3 z-10 flex w-full justify-center">
        <Image
          alt=""
          className="size-6 xl:hidden"
          draggable={false}
          src={IMAGE.url + heroImage + IMAGE.icon}
          width={24}
        />
      </div>
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

      <section className="relative flex items-center gap-x-2 rounded-large border border-divider p-2">
        <div className="flex grow flex-col">
          <span className="hidden font-semibold xl:block">{heroName}</span>
          <span className="text-center text-sm font-medium xl:text-start">
            {winRate.toFixed(1)}%
          </span>
        </div>
        <Image
          alt=""
          className="hidden min-w-[70px] xl:block"
          draggable={false}
          src={IMAGE.url + heroImage + IMAGE.horizontal}
          width={70}
        />
      </section>
    </Link>
  );
}
