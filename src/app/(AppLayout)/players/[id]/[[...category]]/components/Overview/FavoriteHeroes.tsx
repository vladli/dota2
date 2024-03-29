import { GetMostPlayedHeroesDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";
import { GAME_VERSION } from "@/lib/constants";

import FavoriteHeroesTable from "./table/FavoriteHeroesTable";

type Props = {
  steamId: string;
};
export default async function FavoriteHeroes({ steamId }: Props) {
  const { data } = await getClient().query({
    query: GetMostPlayedHeroesDocument,
    variables: {
      steamAccountId: Number(steamId),
      gameVersionId: GAME_VERSION,
      take: 50000,
    },
  });
  return (
    <section className="mt-2">
      <FavoriteHeroesTable data={data} />
    </section>
  );
}
