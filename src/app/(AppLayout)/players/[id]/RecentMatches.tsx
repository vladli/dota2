import { getHeroStats, getPlayerRecentMatches } from "@/actions/actions";

import RecentMatchesTable from "./components/RecentMatchesTable";
import TableTitle from "./components/TableTitle";

type Props = {
  steamId: string;
};

export default async function RecentMatches({ steamId }: Props) {
  const data = await getPlayerRecentMatches(steamId);
  const heroes = await getHeroStats();
  return (
    <section className="mt-4 grow">
      <TableTitle>Recent Matches</TableTitle>
      <RecentMatchesTable
        data={data}
        heroes={heroes}
      />
    </section>
  );
}
