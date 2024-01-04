import { GetLeaderBoardsDocument } from "@/graphql/leaderboard";
import { getClient } from "@/lib/client";
import { InputMaybe, LeaderboardDivision } from "@/types/types.generated";

import Table from "./components/Table";
import CountryFilter from "./filters/CountryFilter";

type Props = {
  searchParams: {
    region: string;
  };
};

export default async function page({ searchParams }: Props) {
  const region = searchParams.region || "AMERICAS";
  const { data } = await getClient().query({
    query: GetLeaderBoardsDocument,
    variables: {
      leaderboardRequestVariable: {
        leaderBoardDivision: region as InputMaybe<LeaderboardDivision>,
      },
      take: 150,
    },
  });
  const top10 = data.leaderboard?.season?.players?.filter(
    (player) => player?.rank && player?.rank <= 10
  );
  const top100 = data.leaderboard?.season?.players?.filter(
    (player) => player?.rank >= 11 && player?.rank <= 100
  );
  const newData = (top: 10 | 100) => {
    return {
      ...data,
      leaderboard: {
        ...data.leaderboard,
        season: {
          ...data.leaderboard?.season,
          players: top === 10 ? top10 : top100,
        },
      },
    };
  };
  return (
    <main className="p-4">
      <CountryFilter />
      <Table
        data={newData(10)}
        header="Top 10"
      />
      <Table
        data={newData(100)}
        header="Top 100"
      />
    </main>
  );
}
