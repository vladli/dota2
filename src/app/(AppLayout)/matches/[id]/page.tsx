import {
  getHeroStats,
  getItems,
  getItemsId,
  getMatch,
} from "@/actions/actions";

import ClientTabs from "./ClientTabs";
import MatchCard from "./MatchCard";

export async function generateMetadata({ params }: Props) {
  return {
    title: "Match #" + params.id,
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const data = await getMatch(params.id);
  const heroes = await getHeroStats();
  const itemsId = await getItemsId();
  const items = await getItems();
  return (
    <main className="p-4">
      <MatchCard data={data} />
      <ClientTabs
        data={data}
        heroes={heroes}
        items={items}
        itemsId={itemsId}
      />
    </main>
  );
}
