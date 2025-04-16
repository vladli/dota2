import { Metadata } from "next";
import { z } from "zod";

import { GetLeaderBoardsDocument } from "@/graphql/leaderboard";
import { getClient } from "@/lib/client";
import { InputMaybe, LeaderboardDivision } from "@/types/types.generated";

import Table from "./components/Table";
import CountryFilter from "./filters/CountryFilter";

export const metadata: Metadata = {
  title: "Leaderboards",
};

type Props = {
  searchParams: Promise<{
    region: string;
  }>;
};

const regionSchema = z.union([
  z.undefined(),
  z.literal("AMERICAS"),
  z.literal("SE_ASIA"),
  z.literal("EUROPE"),
  z.literal("CHINA"),
]);

export default async function page(props: Props) {
  const searchParams = await props.searchParams;
  const validatedRegion = regionSchema.safeParse(searchParams.region);

  const region = validatedRegion.success ? searchParams.region : "AMERICAS";
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
    (player) => player?.rank && player?.rank <= 10,
  );
  const top100 = data.leaderboard?.season?.players?.filter(
    (player) => player?.rank >= 11 && player?.rank <= 100,
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
      <Table data={newData(10)} header="Top 10" />
      <Table data={newData(100)} header="Top 100" />
    </main>
  );
}
