import { useQuery } from "@apollo/client";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import Alert from "@/components/Alert";
import { GetMatchLanesDocument } from "@/graphql/match";

import LanesPositions from "../subtabs/LanesPositions";
import LanesSummary from "../subtabs/LanesSummary";

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

  return (
    <main>
      <Tabs
        className="flex justify-center"
        defaultSelectedKey="Summary"
        variant="underlined"
      >
        <Tab
          key="Summary"
          title="Summary"
        >
          <LanesSummary data={data} />
        </Tab>
        <Tab
          key="Positions"
          title="Positions"
        >
          <LanesPositions data={data} />
        </Tab>
      </Tabs>
    </main>
  );
}
