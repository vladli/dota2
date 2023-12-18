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
import { cn, getHeroById, getRankName, secondsToTime } from "@/lib/utils";
import { IHero, IMatch } from "@/types/types";

type Props = {
  data: IMatch[];
  heroes: IHero[];
};

export default function RecentMatchesTable({ data, heroes }: Props) {
  return (
    <Table
      aria-label="RecentMatchesTable"
      classNames={{
        base: "border p-1 rounded-xl border-content2",
        wrapper: "bg-transparent shadow-none",
      }}
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
                    width={60}
                  />
                  <div className="flex flex-col">
                    <Link
                      as={NextLink}
                      className="w-fit"
                      href={`/heroes/${hero?.id}`}
                    >
                      {hero?.localized_name}
                    </Link>
                    {match.average_rank && (
                      <span className="text-gray-400">
                        {getRankName(match.average_rank.toString()[0])}{" "}
                        {match.average_rank.toString()[1]}
                      </span>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <Link
                    as={NextLink}
                    className={cn("w-fit", {
                      "text-green-500": team === win,
                      "text-red-500": team !== win,
                    })}
                    href={`/matches/${match.match_id}`}
                  >
                    {team === win ? "Won Match" : "Lost Match"}
                  </Link>
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
