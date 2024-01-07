import { Divider } from "@nextui-org/react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { GetHeroByIdDocument } from "@/graphql/constants";
import { getClient } from "@/lib/client";
import { HERO_VIDEO, IMAGE } from "@/lib/constants";

import HeroAbilities from "./HeroAbilities";
import HeroAttributes from "./HeroAttributes";
import HeroCard from "./HeroCard";
import HeroStats from "./HeroStats";
import HeroTalents from "./HeroTalents";

export async function generateMetadata({ params }: Props) {
  if (isNaN(+params.id)) return;
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: { id: Number(params.id) },
  });
  return {
    title: data?.constants?.hero?.displayName || "UNKNOWN",
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  if (isNaN(+params.id)) return notFound();
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: { id: Number(params.id) },
  });
  if (!data.constants?.hero) return notFound();
  return (
    <main className="p-4">
      <div>
        <section className="relative flex h-[15rem] justify-around ">
          <div className="absolute -z-10 h-full w-full">
            <Image
              alt="Background"
              className="object-fill opacity-80 blur-[120px]"
              fill
              src={
                IMAGE.url + data.constants.hero.shortName + IMAGE.vertical || ""
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
        <Divider />
        <section className="flex w-full justify-evenly">
          <div className="flex ">
            <HeroAttributes data={data} />
          </div>
          <div>
            <Divider orientation="vertical" />
          </div>
          <HeroStats data={data} />
        </section>
        <Divider />
        <section className="flex justify-center">
          <HeroTalents data={data} />
        </section>
        <Divider />
        <section className="flex flex-col items-center justify-around">
          <HeroAbilities data={data} />
        </section>
      </div>
    </main>
  );
}
