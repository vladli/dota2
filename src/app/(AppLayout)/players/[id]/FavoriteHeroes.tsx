import { GetMostPlayedHeroesDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";

import FavoriteHeroesTable from "./components/FavoriteHeroesTable";

type Props = {
  steamId: string;
};
export default async function FavoriteHeroes({ steamId }: Props) {
  const { data } = await getClient().query({
    query: GetMostPlayedHeroesDocument,
    variables: {
      steamAccountId: Number(steamId),
      gameVersionId: 169,
      take: 50000,
    },
  });
  return (
    <section className="mt-2">
      <FavoriteHeroesTable data={data} />
    </section>
  );
}
