import { Card, Divider } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { getPlayer } from "@/actions/actions";

import FavoriteHeroes from "./FavoriteHeroes";
import PlayedWith from "./PlayedWith";
import PlayerCard from "./PlayerCard";
import RecentMatches from "./RecentMatches";

export const revalidate = 1800;

export async function generateMetadata({ params }: Props) {
  const data = await getPlayer(params.id);
  return {
    title: data?.profile?.personaname || "Unknown",
  };
}

type Props = {
  params: {
    id: string;
  };
};
export default async function page({ params }: Props) {
  const data = await getPlayer(params.id);
  if (!data.profile) return notFound();
  return (
    <main className="p-4">
      <Card className="p-4">
        <PlayerCard
          player={data}
          steamId={params.id}
        />
        <Divider />
        <section className="flex flex-col gap-1 xl:flex-row">
          <RecentMatches steamId={params.id} />
          <div className="flex flex-col gap-1">
            <PlayedWith steamId={params.id} />
            <FavoriteHeroes steamId={params.id} />
          </div>
        </section>
      </Card>
    </main>
  );
}
