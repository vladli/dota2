import { GetPlayerActivityStatsQuery } from "@/graphql/player";

import HeaderCard from "./HeaderCard";

type Props = {
  data: GetPlayerActivityStatsQuery | null;
};
export default function PlayerActivity({ data }: Props) {
  const player = data?.player;
  return (
    <div>
      <HeaderCard data={data} />
    </div>
  );
}
