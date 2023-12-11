import { getHeroStats } from "@/actions/actions";

import HeroesTable from "./HeroesTable";

export default async function page() {
  const data = await getHeroStats();

  return (
    <main className="p-4">
      <HeroesTable data={data} />
    </main>
  );
}
