import Image from "next/image";
import { notFound } from "next/navigation";
import { z } from "zod";

import ErrorCard from "@/components/ErrorCard";
import { GetAllHeroesDocument } from "@/graphql/constants";
import {
  GetPlayerActivityStatsDocument,
  GetPlayerBySteamIdDocument,
} from "@/graphql/player";
import { getClient } from "@/lib/client";
import {
  FindMatchPlayerGroupBy,
  FindMatchPlayerList,
} from "@/types/types.generated";

import PlayerActivity from "./components/Activity/Activity";
import ClientTabs from "./components/ClientTabs";
import Friends from "./components/Friends/Friends";
import Heroes from "./components/Heroes/Heroes";
import Matches from "./components/Matches/Matches";
import Activity from "./components/Overview/Activity";
import DotaPlus from "./components/Overview/DotaPlus";
import FavoriteHeroes from "./components/Overview/FavoriteHeroes";
import PlayedWith from "./components/Overview/PlayedWith";
import RecentMatches from "./components/Overview/RecentMatches";
import PlayerCard from "./components/PlayerCard";

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
    category?: string[];
  };
};

const categorySchema = z.union([
  z.undefined(),
  z.literal("matches"),
  z.literal("heroes"),
  z.literal("friends"),
  z.literal("activity"),
]);

export default async function page({ params }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerBySteamIdDocument,
    variables: { steamAccountId: Number(params.id) },
  });

  const { data: allHeroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  let activity = null;
  if (!data?.player?.steamAccount?.isAnonymous) {
    const activityResponse = await getClient().query({
      query: GetPlayerActivityStatsDocument,
      variables: {
        steamAccountId: Number(params.id),
        heroStatsByDayRequest: {
          take: 10000,
          groupBy: FindMatchPlayerGroupBy.DateDayHero,
          playerList: FindMatchPlayerList.Single,
        },
        statsByHourRequest: {
          take: 10,
          groupBy: FindMatchPlayerGroupBy.Hour,
          playerList: FindMatchPlayerList.Single,
        },
      },
    });
    activity = activityResponse.data;
  }
  const validatedCategories = categorySchema.safeParse(params.category?.[0]);
  if (!data.player?.steamAccount || !validatedCategories.success)
    return notFound();
  return (
    <main>
      <div className="relative pb-4">
        <div className="absolute -z-10 size-full">
          <Image
            alt="Background"
            className="size-[calc(100%+368px)] object-cover opacity-60 blur-[100px]"
            fill
            src={data.player?.steamAccount?.avatar || ""}
            unoptimized
          />
        </div>
        <PlayerCard data={data} />
      </div>

      {data.player?.matches?.length &&
      !data.player.steamAccount?.isAnonymous ? (
        <>
          <ClientTabs playerId={params.id} />
          <section className="flex w-full flex-col p-4">
            {params.category?.includes("matches") ? (
              <Matches
                matchCount={data.player.matchCount}
                playerId={params.id}
              />
            ) : params.category?.includes("heroes") ? (
              <Heroes playerId={params.id} />
            ) : params.category?.includes("friends") ? (
              <Friends playerId={params.id} />
            ) : params.category?.includes("activity") ? (
              <PlayerActivity data={activity} />
            ) : (
              <div className="flex flex-col gap-4">
                <Activity
                  data={activity}
                  trends={data}
                />
                <section className="flex size-full flex-col gap-4 xl:flex-row">
                  <div className="grow">
                    <RecentMatches steamId={params.id} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <PlayedWith steamId={params.id} />
                    <FavoriteHeroes steamId={params.id} />
                  </div>
                </section>
                <DotaPlus
                  allHeroes={allHeroes}
                  steamId={params.id}
                />
              </div>
            )}
          </section>
        </>
      ) : (
        <section className="flex justify-center">
          <ErrorCard />
        </section>
      )}
    </main>
  );
}
