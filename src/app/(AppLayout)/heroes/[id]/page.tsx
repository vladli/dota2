import { Card, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { GetHeroByIdDocument } from "@/graphql/constants";
import { getClient } from "@/lib/client";
import { HERO_VIDEO } from "@/lib/constants";

import HeroAbilities from "./HeroAbilities";
import HeroAttributes from "./HeroAttributes";
import HeroCard from "./HeroCard";
import HeroStats from "./HeroStats";
import HeroTalents from "./HeroTalents";

export async function generateMetadata({ params }: Props) {
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
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: { id: Number(params.id) },
  });
  if (!data) return notFound();
  return (
    <main className="p-4">
      <Card>
        <section className="relative flex h-[15rem] justify-around">
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
        <section className="flex justify-evenly">
          <HeroAttributes data={data} />
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
      </Card>
    </main>
  );
}
