import Image from "next/image";

import { GetHeroByIdQuery } from "@/graphql/constants";
import { HERO_VIDEO, IMAGE } from "@/lib/constants";

import HeroCard from "./TabOverView/HeroCard";

type Props = {
  data: GetHeroByIdQuery;
};
export default function HeroHeader({ data }: Props) {
  return (
    <section className="relative flex h-60 justify-around ">
      <div className="absolute -z-10 size-full">
        <Image
          alt="Background"
          className="object-fill opacity-80 blur-[120px]"
          fill
          priority
          src={
            IMAGE.url + data?.constants?.hero?.shortName + IMAGE.vertical || ""
          }
          unoptimized
        />
      </div>
      <div className="relative flex size-full items-center justify-center md:justify-start">
        <HeroCard data={data} />
      </div>
      <div className="hidden w-80 md:flex">
        <video
          autoPlay
          loop
          muted
        >
          <source
            src={HERO_VIDEO + data.constants?.hero?.shortName + ".webm"}
            type="video/webm"
          />
        </video>
      </div>
    </section>
  );
}
