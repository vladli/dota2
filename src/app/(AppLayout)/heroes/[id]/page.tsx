import { notFound } from "next/navigation";

import {
  GetAbilitiesDocument,
  GetAllHeroesDocument,
  GetHeroByIdDocument,
} from "@/graphql/constants";
import { getClient } from "@/lib/client";

import ClientTabs from "./components/ClientTabs";
import HeroHeader from "./components/HeroHeader";

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: { id: Number(id) },
  });
  return {
    title: data?.constants?.hero?.displayName || "UNKNOWN",
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { id } = await params;
  if (isNaN(+id)) return notFound();
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: {
      id: Number(id),
    },
  });
  const { data: abilities } = await getClient().query({
    query: GetAbilitiesDocument,
  });
  const { data: allHeroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });

  if (!data.constants?.hero) return notFound();
  return (
    <main className="p-4">
      <HeroHeader data={data} />
      <ClientTabs
        abilities={abilities}
        allHeroes={allHeroes}
        data={data}
        heroId={Number(id)}
      />
    </main>
  );
}
