import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { EyeOff } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { GetPlayerBySteamIdDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";

import FavoriteHeroes from "./components/FavoriteHeroes";
import PlayedWith from "./components/PlayedWith";
import PlayerCard from "./components/PlayerCard";
import RecentMatches from "./components/RecentMatches";

export const dynamic = "force-dynamic";

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
    <main>
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
      {data.player?.matches?.length ? (
        <section className="flex w-full flex-col gap-4 p-4 xl:flex-row">
          <RecentMatches steamId={params.id} />
          <div className="flex flex-col gap-1">
            <PlayedWith steamId={params.id} />
            <FavoriteHeroes steamId={params.id} />
          </div>
        </section>
      ) : (
        <section className="flex justify-center">
          <Card className="min-w-fit max-w-28 p-4">
            <CardHeader className="justify-center">
              <EyeOff />
            </CardHeader>
            <CardBody className="font-medium">
              This is a private profile
            </CardBody>
          </Card>
        </section>
      )}
    </main>
  );
}
