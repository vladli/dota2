import { GetAllItemsDocument } from "@/graphql/constants";
import { GetMatchByIdDocument } from "@/graphql/mathch";
import { getClient } from "@/lib/client";

import ClientTabs from "./ClientTabs";
import MatchCard from "./MatchCard";
import ParseCard from "./ParseCard";

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

  return (
    <main className="p-4">
      <MatchCard data={data} />
      {data.match?.parsedDateTime === null && (
        <ParseCard matchId={data.match?.id} />
      )}
      <ClientTabs
        data={data}
        items={items}
      />
    </main>
  );
}
