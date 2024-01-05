import Image from "next/image";
import { notFound } from "next/navigation";

import { GetPlayerBySteamIdDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";

import FavoriteHeroes from "./FavoriteHeroes";
import PlayedWith from "./PlayedWith";
import PlayerCard from "./PlayerCard";
import RecentMatches from "./RecentMatches";

export const revalidate = 0;

export async function generateMetadata({ params }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerBySteamIdDocument,
    variables: { steamAccountId: Number(params.id) },
  });
  const proPlayer = data?.player?.steamAccount?.proSteamAccount;
  return {
    title: proPlayer?.name || data?.player?.steamAccount?.name || "Unknown",
  };
}

type Props = {
  params: {
    id: string;
  };
};
export default async function page({ params }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerBySteamIdDocument,
    variables: { steamAccountId: Number(params.id) },
  });
  if (!data) return notFound();
  return (
    <main className="">
      <div className="relative">
        <div className="absolute -z-10 h-full w-full">
          <Image
            alt="Background"
            className="h-[calc(100%+368px)] w-[calc(100%+368px)] object-cover opacity-60 blur-[100px]"
            fill
            src={data.player?.steamAccount?.avatar || ""}
            unoptimized
          />
        </div>
        <PlayerCard data={data} />
      </div>
      <section className="flex flex-col gap-4 p-4 xl:flex-row">
        <RecentMatches steamId={params.id} />
        <div className="flex flex-col gap-1">
          <PlayedWith steamId={params.id} />
          <FavoriteHeroes steamId={params.id} />
        </div>
      </section>
    </main>
  );
}
