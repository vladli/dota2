import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";

import Alert from "@/components/Alert";
import { GetMatchLanesDocument } from "@/graphql/mathch";

import Table from "../components/TabLanes/Table";

type Props = {
  matchId: number | null;
};

export default function TabLanes({ matchId }: Props) {
  const { data, loading } = useQuery(GetMatchLanesDocument, {
    variables: { id: matchId },
  });
  if (loading || !data)
    return (
      <div className="flex h-full w-full justify-center ">
        <Spinner
          color="primary"
          label="Loading..."
        />
      </div>
    );
  if (data?.match?.players?.[0]?.stats?.experiencePerMinute === null)
    return <Alert text="No data available." />;
  const safeLaneRadiant = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) =>
          (player?.isRadiant && player?.lane === "SAFE_LANE") ||
          (!player?.isRadiant && player?.lane === "OFF_LANE")
      ),
    },
  };
  const offLaneRadiant = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) =>
          (player?.isRadiant && player?.lane === "OFF_LANE") ||
          (!player?.isRadiant && player?.lane === "SAFE_LANE")
      ),
    },
  };
  const midLane = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) => player?.lane === "MID_LANE"
      ),
    },
  };
  const netWorthsAtIndex10 =
    data?.match?.players?.map(
      (player) => player?.stats?.networthPerMinute?.[10] ?? 0
    ) ?? [];

  const highestNetWorth = Math.max(...netWorthsAtIndex10);
  const experienceAtIndex10: (number | null)[] =
    data?.match?.players?.map((player) =>
      player?.stats?.experiencePerMinute
        ? player.stats.experiencePerMinute
            .slice(0, 10)
            .reduce((a, b) => (a || 0) + (b || 0), 0)
        : 0
    ) ?? [];

  const highestExperience = Math.max(
    ...experienceAtIndex10
      .filter((value) => value !== null)
      .map((value) => value as number)
  );
  return (
    <main>
      <Alert text="View performance over the first 10 minutes of the game." />
      <section className="flex flex-col gap-4">
        <Table
          data={offLaneRadiant}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <Table
          data={midLane}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <Table
          data={safeLaneRadiant}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
      </section>
    </main>
  );
}
