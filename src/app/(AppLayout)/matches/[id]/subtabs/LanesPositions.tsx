import Alert from "@/components/Alert";
import { GetMatchLanesQuery } from "@/graphql/mathch";

import TableSummary from "../components/TabLanes/TableSummary";

type Props = {
  data: GetMatchLanesQuery;
};
export default function LanesPositions({ data }: Props) {
  const safeLane = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) => player?.lane === "SAFE_LANE" && player.role === "CORE"
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
  const offLane = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) => player?.lane === "OFF_LANE" && player.role === "CORE"
      ),
    },
  };
  const softSupport = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) => player?.role === "LIGHT_SUPPORT"
      ),
    },
  };
  const hardSupport = {
    ...data,
    match: {
      ...data.match,
      players: data.match?.players?.filter(
        (player) => player?.role === "HARD_SUPPORT"
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
    <>
      <Alert text="View performance over the first 10 minutes of the game." />
      <section className="flex flex-col gap-4">
        <TableSummary
          data={safeLane}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <TableSummary
          data={midLane}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <TableSummary
          data={offLane}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <TableSummary
          data={softSupport}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
        <TableSummary
          data={hardSupport}
          highestExperience={highestExperience}
          highestNetWorth={highestNetWorth}
        />
      </section>
    </>
  );
}
