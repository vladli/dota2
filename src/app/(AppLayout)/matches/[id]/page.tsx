import { GetAllHeroesDocument, GetAllItemsDocument } from "@/graphql/constants";
import { GetMatchByIdDocument } from "@/graphql/match";
import { getClient } from "@/lib/client";
import { cn } from "@/lib/utils";

import ClientTabs from "./components/ClientTabs";
import MatchCard from "./components/TabOverview/MatchCard";
import MatchInfo from "./components/TabOverview/MatchInfo";
import ParseCard from "./components/TabOverview/ParseCard";

export const revalidate = 30;

export async function generateMetadata({ params }: Props) {
  return {
    title: "Match #" + params.id,
  };
}

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
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
        <div
          className={cn(
            "absolute top-0 left-0 h-full w-full opacity-20 blur-[150px] lg:blur-[100px] -z-10",
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
