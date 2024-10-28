import { Image } from "@nextui-org/react";

import Header from "@/components/Header";
import { GetAllHeroesDocument } from "@/graphql/constants";
import { GetTeamByIdDocument } from "@/graphql/team";
import { getClient } from "@/lib/client";
import { IMAGE } from "@/lib/constants";

import Players from "./components/Players";

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { data } = await getClient().query({
    query: GetTeamByIdDocument,
    variables: { id: Number(params.id) },
  });
  return {
    title: data.team?.name || "Unknown",
  };
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export default async function page(props: Props) {
  const params = await props.params;
  const { data } = await getClient().query({
    query: GetTeamByIdDocument,
    variables: { id: +params.id },
  });
  const { data: allHeroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  const team = data.team;
  return (
    <>
      <Header backgroundImg={IMAGE.urlTeam + team?.id + ".png"}>
        <div className="flex flex-col items-center gap-2">
          <Image
            alt=""
            src={IMAGE.urlTeam + team?.id + ".png" || ""}
            width={150}
          />
          <h1>{team?.name}</h1>
        </div>
      </Header>
      <main className="p-4">
        <section></section>
        <Players
          allHeroes={allHeroes}
          data={data}
        />
      </main>
    </>
  );
}
