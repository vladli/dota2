import Image from "next/image";

import { GetHeroByIdQuery } from "@/graphql/constants";
import { HERO_VIDEO, IMAGE } from "@/lib/constants";

import HeroCard from "./TabOverView/HeroCard";

type Props = {
  data: GetHeroByIdQuery;
};
export default function HeroHeader({ data }: Props) {
  return (
    <section className="relative flex h-[15rem] justify-around ">
      <div className="absolute -z-10 h-full w-full">
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
      <div className="relative flex h-full w-full items-center justify-center md:justify-start">
        <HeroCard data={data} />
      </div>
      <div className="hidden w-[20rem] md:flex">
        <video
          autoPlay
          loop
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
