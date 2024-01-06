import { GetPlayerPeersDocument } from "@/graphql/stratz";
import { getClient } from "@/lib/client";
import {
  FilterMatchGroupOrderByEnum,
  FilterPlayerTeammateEnum,
} from "@/types/types.generated";

import PlayedWithTable from "./components/PlayedWithTable";

type Props = {
  steamId: string;
};
export default async function PlayedWith({ steamId }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerPeersDocument,
    variables: {
      steamId: Number(steamId),
      take: 8,
      skip: 1,
      teammatesPeersRequest: {
        matchGroupOrderBy: FilterMatchGroupOrderByEnum.MatchCount,
        playerTeammateSort: FilterPlayerTeammateEnum.With,
        take: 5000,
      },
    },
  });
  return (
    <section>
      <PlayedWithTable data={data} />
    </section>
  );
}
