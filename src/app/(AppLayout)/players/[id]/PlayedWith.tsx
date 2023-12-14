import { getPlayerPlayedWith } from "@/actions/actions";

import PlayedWithTable from "./components/PlayedWithTable";
import TableTitle from "./components/TableTitle";

type Props = {
  steamId: string;
};
export default async function PlayedWith({ steamId }: Props) {
  const data = await getPlayerPlayedWith(steamId);
  return (
    <section className="mt-4">
      <TableTitle>Played With</TableTitle>
      <PlayedWithTable data={data} />
    </section>
  );
}
