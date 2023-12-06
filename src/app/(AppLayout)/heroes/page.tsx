import { getHeroStats } from "@/actions/actions";

import HeroesTable from "./HeroesTable";

export default async function page() {
  const data = await getHeroStats();
  return <HeroesTable data={data} />;
}
