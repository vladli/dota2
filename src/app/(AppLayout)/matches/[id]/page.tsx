import { GetAllHeroesDocument, GetAllItemsDocument } from "@/graphql/constants";
import { GetMatchByIdDocument } from "@/graphql/match";
import { getClient } from "@/lib/client";
import { cn } from "@/lib/utils";

import ClientTabs from "./components/ClientTabs";
import MatchCard from "./components/MatchCard";
import MatchInfo from "./components/MatchInfo";
import ParseCard from "./components/TabOverview/ParseCard";

export const revalidate = 30;

export async function generateMetadata(props: Props) {
  const params = await props.params;
  return {
    title: "Match #" + params.id,
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
    query: GetMatchByIdDocument,
    variables: { id: Number(params.id) },
  });
  const { data: items } = await getClient().query({
    query: GetAllItemsDocument,
  });
  const { data: heroes } = await getClient().query({
    query: GetAllHeroesDocument,
  });
  return (
    <main>
      <div className="relative h-full p-4">
        <div className="absolute left-0 top-0 -z-10 size-full bg-black" />
        <div
          className={cn(
            "absolute top-0 left-0 size-full opacity-20 blur-[80px] lg:blur-[100px] -z-10",
            {
              "bg-success-400": data.match?.didRadiantWin,
              "bg-danger-500": !data.match?.didRadiantWin,
            }
          )}
        />
        <MatchCard data={data} />
      </div>
      <MatchInfo data={data} />
      <div className="p-4">
        {data.match?.parsedDateTime === null && (
          <ParseCard matchId={data.match?.id} />
        )}
        <ClientTabs
          data={data}
          heroes={heroes}
          items={items}
        />
      </div>
    </main>
  );
}
