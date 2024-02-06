import { GetPlayerActivityStatsQuery } from "@/graphql/player";

import HeaderCard from "./HeaderCard";
import SeasonTable from "./SeasonTable";

type Props = {
  data: GetPlayerActivityStatsQuery | null;
};
export default function Activity({ data }: Props) {
  return (
    <main className="flex flex-col gap-y-4">
      <HeaderCard data={data} />
      <SeasonTable data={data} />
    </main>
  );
}
