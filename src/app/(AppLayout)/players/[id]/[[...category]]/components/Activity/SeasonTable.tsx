import { GetPlayerActivityStatsQuery } from "@/graphql/player";

import ActivityItem from "./ActivityItem";

type Props = {
  data: GetPlayerActivityStatsQuery | null;
};
export default function SeasonTable({ data }: Props) {
  const firstYear = new Date(data?.player?.firstMatchDate * 1000).getFullYear();
  const todayYear = new Date().getFullYear();
  const yearsArray = [];
  for (let i = firstYear; i <= todayYear; i++) {
    yearsArray.push(
      <ActivityItem
        data={data}
        key={i}
        year={i}
      />
    );
  }
  return <div className="flex flex-col gap-4">{yearsArray.toReversed()}</div>;
}
