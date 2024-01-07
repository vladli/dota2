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
    <section>
      <div className="mb-2 flex items-center gap-1">
        <Image
          alt="Attribute"
          height={24}
          src={`/img/hero_type/${ATTR_IMAGE[header]}.png`}
          width={24}
        />
        <h1 className="font-medium text-foreground-600">{header}</h1>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {data?.map((hero) => (
          <Link
            className="group relative cursor-pointer"
            href={`/heroes/${hero?.id}`}
            key={hero?.id}
          >
            {/* <div className="absolute -bottom-5 left-1/2 z-[100] hidden -translate-x-1/2 group-hover:block">
              {hero?.displayName}
            </div> */}
            <Image
              alt="Hero"
              className="grayscale-[0.2] group-hover:z-50 group-hover:scale-150"
              height={60}
              removeWrapper
              src={IMAGE.url + hero?.shortName + IMAGE.vertical}
              width={60}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
