import { Card, Divider } from "@nextui-org/react";

import { getPlayer } from "@/actions/actions";

import PlayedWith from "./PlayedWith";
import PlayerCard from "./PlayerCard";
import RecentMatches from "./RecentMatches";

type Props = {
  params: {
    id: string;
  };
};
export default async function page({ params }: Props) {
  const data = await getPlayer(params.id);
  return (
    <main className="p-4">
      <Card className="p-4">
        <PlayerCard
          player={data}
          steamId={params.id}
        />
        <Divider />
        <section className="flex flex-col gap-1 md:flex-row">
          <RecentMatches steamId={params.id} />
          <PlayedWith steamId={params.id} />
        </section>
      </Card>
    </main>
  );
}
