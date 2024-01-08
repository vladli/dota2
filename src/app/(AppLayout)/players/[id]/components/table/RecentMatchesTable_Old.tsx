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

import { GetPlayerMatchesQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";
import { cn, getRankName, secondsToTime } from "@/lib/utils";

import TableTitle from "../TableTitle";

type Props = {
  data: GetPlayerMatchesQuery;
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
      <TableBody emptyContent="No information.">
        {matches!.map((match) => {
          const player = match?.players![0];
          return (
            <TableRow
              as={NextLink}
              className="hover:cursor-pointer hover:bg-content2"
              href={`/matches/${match?.id}`}
              key={match?.id}
            >
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt=""
                    height={14}
                    radius="none"
                    src={"/img/position/POSITION_1.svg"}
                    width={14}
                  />
                  <Link
                    as={NextLink}
                    href={`/heroes/${player?.hero?.id}`}
                  >
                    <Image
                      alt="Hero"
                      className="min-w-[60px]"
                      radius="none"
                      removeWrapper
                      src={
                        IMAGE.url + player?.hero?.shortName + IMAGE.horizontal
                      }
                      width={60}
                    />
                  </Link>

                  <div className="flex flex-col">
                    {player?.hero?.displayName}
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
                  <span
                    className={cn("w-fit", {
                      "text-success-400": match?.players![0]?.isVictory,
                      "text-danger-500": !match?.players![0]?.isVictory,
                    })}
                  >
                    {match?.players![0]?.isVictory ? "Won Match" : "Lost Match"}
                  </span>
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
