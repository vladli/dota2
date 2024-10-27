import { Image } from "@nextui-org/react";
import Link from "next/link";

import { IMAGE } from "@/lib/constants";

type THero = {
  __typename?: "HeroType";
  id?: any | null;
  name?: string | null;
  displayName?: string | null;
  shortName?: string | null;
  stats?: {
    __typename?: "HeroStatType";
    primaryAttribute?: string | null;
  } | null;
} | null;
type Props = {
  header: string;
  data?: THero[] | null;
};

const ATTR_IMAGE: { [key: string]: string } = {
  Strength: "hero_strength",
  Agility: "hero_agility",
  Intelligence: "hero_intelligence",
  Universal: "hero_universal",
};

export default function HeroesTable({ header, data }: Props) {
  return (
    <section className="flex-1">
      <div className="mb-2 flex items-center gap-1">
        <Image
          alt="Attribute"
          draggable={false}
          height={24}
          src={`/img/hero_type/${ATTR_IMAGE[header]}.png`}
          width={24}
        />
        <h2 className="text-foreground-600">{header}</h2>
      </div>
      <div className="grid grid-cols-auto-fill gap-1 xl:flex xl:flex-wrap">
        {data?.map((hero) => (
          <Link
            className="group relative cursor-pointer "
            href={`/heroes/${hero?.id}`}
            key={hero?.id}
          >
            <span className="absolute -bottom-6 left-[-17.5px] z-20 w-[105px] rounded-b-large bg-gradient-to-r from-black to-black/30 px-[1px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
              {hero?.displayName}
            </span>
            <Image
              alt="Hero"
              className="z-0 grayscale-[0.2] group-hover:z-10 group-hover:scale-150"
              draggable={false}
              height={85}
              removeWrapper
              src={IMAGE.url + hero?.shortName + IMAGE.vertical}
              width={70}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
