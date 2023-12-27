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

import { GetRecentMatchesQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { cn, getRankName, secondsToTime } from "@/lib/utils";

import TableTitle from "./TableTitle";

type Props = {
  data: GetRecentMatchesQuery;
};

function processString(inputString: string) {
  const withoutSpaces = inputString.replace(/[ _]/g, " ");

  // Convert to lowercase
  const lowercaseString = withoutSpaces.toLowerCase();

  return lowercaseString;
}

export default function RecentMatchesTable({ data }: Props) {
  const matches = data.player?.matches;
  return (
    <Table
      aria-label="RecentMatchesTable"
      topContent={<TableTitle>Recent Matches</TableTitle>}
    >
      <TableHeader>
        <TableColumn>HERO</TableColumn>
        <TableColumn>RESULT</TableColumn>
        <TableColumn>GAME MODE</TableColumn>
        <TableColumn>DURATION</TableColumn>
        <TableColumn>K/D/A</TableColumn>
      </TableHeader>
      <TableBody>
        {matches!.map((match) => {
          const player = match?.players![0];
          return (
            <TableRow key={match?.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt="Hero"
                    className="min-w-[60px]"
                    radius="none"
                    removeWrapper
                    src={IMAGE.url + player?.hero?.shortName + IMAGE.horizontal}
                    width={60}
                  />
                  <div className="flex flex-col">
                    <Link
                      as={NextLink}
                      className="w-fit"
                      color="foreground"
                      href={`/heroes/${player?.hero?.id}`}
                      underline="hover"
                    >
                      {player?.hero?.displayName}
                    </Link>
                    {match?.actualRank && (
                      <span className="text-foreground-500">
                        {getRankName(match.actualRank.toString()[0])}{" "}
                        {match.actualRank.toString()[1]}
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
                      "text-success-400": match?.players![0]?.isVictory,
                      "text-danger-500": !match?.players![0]?.isVictory,
                    })}
                    href={`/matches/${match?.id}`}
                    underline="hover"
                  >
                    {match?.players![0]?.isVictory ? "Won Match" : "Lost Match"}
                  </Link>
                  <span className="text-foreground-500">
                    {formatDistanceToNow(match?.endDateTime * 1000, {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="capitalize">
                  {processString(match?.gameMode!)}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{secondsToTime(match?.durationSeconds!)}</span>
                </div>
              </TableCell>
              <TableCell>
                {match?.players![0]?.kills}/{match?.players![0]?.deaths}/
                {match?.players![0]?.assists}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
