import Loading from "@/components/Loading";
import { GetPlayerPeersDocument } from "@/graphql/stratz";
import { getClient } from "@/lib/client";
import {
  FilterMatchGroupOrderByEnum,
  FilterPlayerTeammateEnum,
} from "@/types/types.generated";

import FriendsTable from "./FriendsTable";

type Props = {
  playerId: string;
};
export default async function PlayerFriends({ playerId }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerPeersDocument,
    variables: {
      steamId: Number(playerId),
      take: 100,
      skip: 1,
      teammatesPeersRequest: {
        matchGroupOrderBy: FilterMatchGroupOrderByEnum.MatchCount,
        playerTeammateSort: FilterPlayerTeammateEnum.With,
        matchLimitMin: 10,
        skip: 0,
        take: 10000,
      },
    },
  });

  if (!data) return <Loading />;
  return <FriendsTable data={data} />;
}
