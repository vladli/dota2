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
} from "@heroui/react";
import { EyeOff } from "lucide-react";

import Tooltip from "@/components/Tooltip";
import { GetPlayerPeersQuery } from "@/graphql/stratz";
import dayjs from "@/lib/dayjs";
import { getAvatarLink } from "@/lib/utils";

import TableTitle from "../TableTitle";

type Props = {
  data: GetPlayerPeersQuery;
};

export default function PlayedWithTable({ data }: Props) {
  const peers = data.stratz?.page?.player?.peers;
  return (
    <Table
      aria-label="PlayedWithTable"
      topContent={<TableTitle>Played With</TableTitle>}
    >
      <TableHeader>
        <TableColumn>PLAYER</TableColumn>
        <TableColumn>MATCHES</TableColumn>
        <TableColumn>WIN RATE</TableColumn>
      </TableHeader>
      <TableBody emptyContent="No information.">
        {peers!.map((peer) => (
          <TableRow key={peer?.steamAccountId}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  className="min-w-[40px]"
                  radius="sm"
                  src={getAvatarLink(peer?.steamAccount?.avatar) || ""}
                  width={40}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Link
                      className="w-fit"
                      href={`/players/${peer?.steamAccount?.id}`}
                    >
                      {peer?.steamAccount?.name}
                    </Link>
                    {peer?.steamAccount?.isAnonymous && (
                      <Tooltip content="Anonymous" showArrow>
                        <div className="flex items-center">
                          <EyeOff color="#52525b" size={14} />
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  <span className="text-foreground-500">
                    {dayjs(new Date(peer?.lastMatchDateTime * 1000)).fromNow()}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{peer?.matchCount}</TableCell>
            <TableCell>
              {((peer?.winCount! / peer?.matchCount!) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
