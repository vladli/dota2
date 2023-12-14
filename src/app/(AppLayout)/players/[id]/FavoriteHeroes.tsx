import { getHeroStats, getPlayerFavoriteHeroes } from "@/actions/actions";

import FavoriteHeroesTable from "./components/FavoriteHeroesTable";
import TableTitle from "./components/TableTitle";

type Props = {
  steamId: string;
};
export default async function FavoriteHeroes({ steamId }: Props) {
  const data = await getPlayerFavoriteHeroes(steamId);
  const heroes = await getHeroStats();
  return (
    <section className="mt-4">
      <TableTitle>Favorite Heroes</TableTitle>
      <FavoriteHeroesTable
        data={data}
        heroes={heroes}
      />
    </section>
  );
}
