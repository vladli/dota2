import { Card, CardBody, Image } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import RoleImage from "@/components/RoleImage";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetTeamByIdQuery } from "@/graphql/team";
import { IMAGE } from "@/lib/constants";
import { MatchPlayerPositionType } from "@/types/types.generated";

type Props = {
  allHeroes: GetAllHeroesQuery;
  data: GetTeamByIdQuery;
};
export default function Players({ allHeroes, data }: Props) {
  const players = data.team?.members?.slice(0, 5);

  const sortedPlayers = players?.toSorted((a, b) => {
    const positionsA = a?.player?.matches?.flatMap((match) =>
      match?.players
        ?.filter((pl) => pl?.steamAccountId === a.steamAccountId)
        .map((pl) => pl?.position)
    );
    const positionsB = b?.player?.matches?.flatMap((match) =>
      match?.players
        ?.filter((pl) => pl?.steamAccountId === b.steamAccountId)
        .map((pl) => pl?.position)
    );
    const positionCountsA = positionsA?.reduce((acc: any, position) => {
      if (position) {
        acc[position] = (acc[position] || 0) + 1;
      }
      return acc;
    }, {});
    const positionCountsB = positionsB?.reduce((acc: any, position) => {
      if (position) {
        acc[position] = (acc[position] || 0) + 1;
      }
      return acc;
    }, {});
    const mostPlayedPositionA = positionCountsA
      ? Object.keys(positionCountsA).reduce(
          (prev, curr) =>
            positionCountsA[prev] > positionCountsA[curr] ? prev : curr,
          Object.keys(positionCountsA)[0]
        )
      : "";

    const mostPlayedPositionB = Object.keys(positionCountsB)?.reduce(
      (prev, curr) =>
        positionCountsB[prev] > positionCountsB[curr] ? prev : curr
    );
    return mostPlayedPositionA?.localeCompare(mostPlayedPositionB);
  });

  return (
    <div className="flex flex-col justify-around gap-2 lg:flex-row">
      {sortedPlayers?.map((player) => {
        const proPlayer = player?.player?.steamAccount?.proSteamAccount;
        const positions = player?.player?.matches?.flatMap((match) =>
          match?.players
            ?.filter((pl) => pl?.steamAccountId === player.steamAccountId)
            .map((pl) => pl?.position)
        );
        const positionCounts = positions?.reduce((acc: any, position) => {
          if (position) {
            acc[position] = (acc[position] || 0) + 1;
          }
          return acc;
        }, {});
        const mostPlayedPosition =
          positionCounts && Object.keys(positionCounts).length > 0
            ? Object.keys(positionCounts).reduce((a, b) =>
                positionCounts[a] > positionCounts[b] ? a : b
              )
            : null;

        return (
          <Card
            as={Link}
            className="lg:max-w-[300px]"
            href={"/players/" + player?.steamAccountId}
            isPressable
            key={player?.steamAccountId}
          >
            <CardBody>
              <div className="flex items-center gap-4 lg:flex-col">
                <div className="max-w-[200px] lg:max-w-[300px]">
                  <Image
                    alt=""
                    height={300}
                    src={
                      IMAGE.urlPlayer + player?.steamAccountId + ".png" || ""
                    }
                    width={300}
                  />
                </div>
                <section className="flex flex-col gap-y-2 lg:items-center">
                  <div className="flex flex-col gap-y-1 lg:items-center">
                    <span>{proPlayer?.name}</span>
                    <span className="text-sm">{proPlayer?.realName}</span>
                    <RoleImage
                      position={mostPlayedPosition as MatchPlayerPositionType}
                      size={20}
                    />
                  </div>
                  <div className="flex flex-col lg:items-center">
                    <p className="text-sm font-semibold">Joined</p>
                    <span className="text-sm font-medium text-foreground-500">
                      {formatDistanceToNow(player?.firstMatchDateTime * 1000, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </section>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
}
