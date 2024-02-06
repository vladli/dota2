import { GetMostPlayedHeroesDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";
import { GAME_VERSION } from "@/lib/constants";

import HeroesTable from "./HeroesTable";

type Props = {
  playerId: string;
};
export default async function Heroes({ playerId }: Props) {
  const { data } = await getClient().query({
    query: GetMostPlayedHeroesDocument,
    variables: {
      steamAccountId: Number(playerId),
      gameVersionId: GAME_VERSION,
      take: 50000,
    },
  });

  return (
    <>
      <HeroesTable data={data} />
    </>
  );
}
