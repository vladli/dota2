import type { Metadata } from "next/types";

import { getHeroStats } from "@/actions/actions";

import HeroesTable from "./HeroesTable";

export const metadata: Metadata = {
  title: "Heroes",
};

export default async function page() {
  const data = await getHeroStats();

  return (
    <main className="p-4">
      <HeroesTable data={data} />
    </main>
  );
}
