import { GetAllHeroesQuery, GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/mathch";

import MatchStats from "../components/TabOverview/MatchStats";
import PickBan from "../components/TabOverview/PickBan";
import PlayersTable from "../components/TabOverview/PlayersTable";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
  items: GetAllItemsQuery;
};

export default function TabOverview({ data, heroes, items }: Props) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <PlayersTable
          data={data}
          items={items}
          team="Radiant"
        />

        <PlayersTable
          data={data}
          items={items}
          team="Dire"
        />
      </div>
      {data.match?.pickBans && (
        <PickBan
          data={data}
          heroes={heroes}
        />
      )}
      {data.match?.radiantExperienceLeads && (
        <MatchStats
          data={data}
          heroes={heroes}
        />
      )}
    </>
  );
}
