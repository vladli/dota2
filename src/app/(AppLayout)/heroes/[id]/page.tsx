import { notFound } from "next/navigation";

import {
  GetAbilitiesDocument,
  GetAllHeroesDocument,
  GetHeroByIdDocument,
} from "@/graphql/constants";
import { getClient } from "@/lib/client";

import ClientTabs from "./components/ClientTabs";
import HeroHeader from "./components/HeroHeader";

export async function generateMetadata(props: Props) {
  const params = await props.params;
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
  params: Promise<{
    id: string;
  }>;
};
export default async function page(props: Props) {
  const params = await props.params;
  if (isNaN(+params.id)) return notFound();
  const { data } = await getClient().query({
    query: GetHeroByIdDocument,
    variables: {
      id: Number(params.id),
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
    <main className="m-2 bg-black p-2">
      <HeroHeader data={data} />
      <ClientTabs
        abilities={abilities}
        allHeroes={allHeroes}
        data={data}
        heroId={Number(params.id)}
      />
    </main>
  );
}
