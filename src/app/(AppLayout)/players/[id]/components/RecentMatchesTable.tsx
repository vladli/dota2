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
import NextLink from "next/link";

import { STEAM_IMAGE } from "@/lib/constants";
import { cn, getRankName, secondsToTime } from "@/lib/utils";
import { IHero, IMatch } from "@/types/types";

type Props = {
  data: IMatch[];
  heroes: IHero[];
};

function getHeroById(heroes: IHero[], id: number) {
  return heroes.find((hero) => hero.id === id);
}

export default function RecentMatchesTable({ data, heroes }: Props) {
  return (
    <Table
      aria-label="RecentMatchesTable"
      classNames={{ base: "border p-1 rounded-xl border-content2" }}
      removeWrapper
    >
      <TableHeader>
        <TableColumn>HERO</TableColumn>
        <TableColumn>RESULT</TableColumn>
        <TableColumn>GAME MODE</TableColumn>
        <TableColumn>DURATION</TableColumn>
        <TableColumn>K/D/A</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((match) => {
          const hero = getHeroById(heroes, match.hero_id);
          const team = match.player_slot < 5 ? "Radiant" : "Dire";
          const win = match.radiant_win ? "Radiant" : "Dire";
          const matchPlayed = new Date(match.start_time * 1000);
          return (
            <TableRow key={match.match_id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt="Hero"
                    className="min-w-[60px]"
                    radius="none"
                    removeWrapper
                    src={STEAM_IMAGE + hero?.img}
                    width={50}
                  />
                  <div className="flex flex-col">
                    <Link
                      as={NextLink}
                      href={`/heroes/${hero?.id}`}
                    >
                      {hero?.localized_name}
                    </Link>
                    <span className="text-gray-400">
                      {getRankName(match.average_rank.toString()[0])}{" "}
                      {match.average_rank.toString()[1]}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span
                    className={cn({
                      "text-green-500": team === win,
                      "text-red-500": team !== win,
                    })}
                  >
                    {team === win ? "Won Match" : "Lost Match"}
                  </span>
                  <span className="text-gray-400">
                    {formatDistanceToNow(matchPlayed, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{secondsToTime(match.duration)}</span>
                </div>
              </TableCell>
              <TableCell>
                {match.kills}/{match.deaths}/{match.assists}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
