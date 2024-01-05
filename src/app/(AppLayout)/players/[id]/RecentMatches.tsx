import { GetRecentMatchesDocument } from "@/graphql/player";
import { getClient } from "@/lib/client";

import RecentMatchesTable from "./components/RecentMatchesTable";

type Props = {
  steamId: string;
};

export default async function RecentMatches({ steamId }: Props) {
  const { data } = await getClient().query({
    query: GetRecentMatchesDocument,
    variables: { steamAccountId: Number(steamId), take: 20 },
  });
  return (
    <section>
      <RecentMatchesTable data={data} />
    </section>
  );
}
