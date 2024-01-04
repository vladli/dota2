"use client";
import {
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";

import { GetMostPlayedHeroesQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";

import TableTitle from "./TableTitle";

type Props = {
  data: GetMostPlayedHeroesQuery;
};

export default function FavoriteHeroesTable({ data }: Props) {
  const player = data.player;
  const heroes = player?.heroesGroupBy?.sort(
    (a: any, b: any) => b.matchCount - a.matchCount
  );
  return (
    <Table
      aria-label="PlayedWithTable"
      topContent={<TableTitle>Favorite Heroes</TableTitle>}
    >
      <TableHeader>
        <TableColumn>HERO</TableColumn>
        <TableColumn>MATCHES</TableColumn>
        <TableColumn>WIN RATE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No information.">
        {heroes!.slice(0, 8).map((hero) => {
          if (hero?.__typename !== "MatchGroupByHeroType")
            return (
              <TableRow>
                <TableCell>UNKNOWN</TableCell>
              </TableRow>
            );
          return (
            <TableRow key={hero.heroId}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt=""
                    className="min-w-[60px]"
                    radius="none"
                    src={IMAGE.url + hero.hero?.shortName + IMAGE.horizontal}
                    width={60}
                  />
                  <div className="flex flex-col">
                    <Link
                      className="w-fit"
                      href={`/heroes/${hero.heroId}`}
                    >
                      {hero.hero?.displayName}
                    </Link>
                    <span className="text-foreground-500">
                      {formatDistanceToNow(
                        new Date(hero.lastMatchDateTime! * 1000),
                        {
                          addSuffix: true,
                        }
                      )}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{hero?.matchCount}</TableCell>
              <TableCell>
                {((hero.winCount! / hero.matchCount!) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
