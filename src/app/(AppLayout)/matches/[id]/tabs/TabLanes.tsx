import { useQuery } from "@apollo/client";
import { Spinner, Tab, Tabs } from "@nextui-org/react";

import Alert from "@/components/Alert";
import { GetMatchLanesDocument } from "@/graphql/mathch";

import LanesPositions from "../subtabs/LanesPositions";
import LanesSummary from "../subtabs/LanesSummary";

type Props = {
  matchId: number | null;
};

const data2 = [
  {
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columns = [
  {
    accessorKey: "firstName",
    enableSorting: false,
  },
];

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
        defaultSelectedKey="Positions"
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
