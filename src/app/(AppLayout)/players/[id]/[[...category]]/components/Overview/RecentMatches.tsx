import { GetPlayerMatchesDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";

import RecentMatchesTable from "./table/RecentMatchesTable";

type Props = {
  steamId: string;
};

export default async function RecentMatches({ steamId }: Props) {
  const { data } = await getClient().query({
    query: GetPlayerMatchesDocument,
    variables: { steamAccountId: Number(steamId), take: 20 },
  });
  return (
    <>
      <RecentMatchesTable data={data} />
    </>
  );
}
