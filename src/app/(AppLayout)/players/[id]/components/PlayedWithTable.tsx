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

import { IPeer } from "@/types/types";

type Props = {
  data: IPeer[];
};
export default function PlayedWithTable({ data }: Props) {
  return (
    <Table
      aria-label="PlayedWithTable"
      classNames={{
        base: "border p-1 rounded-xl border-content2",
        wrapper: "bg-transparent shadow-none",
      }}
    >
      <TableHeader>
        <TableColumn>PLAYER</TableColumn>
        <TableColumn>MATCHES</TableColumn>
        <TableColumn>WIN RATE</TableColumn>
      </TableHeader>
      <TableBody>
        {data.slice(0, 6).map((peer) => (
          <TableRow key={peer.account_id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Image
                  alt=""
                  className="min-w-[40px]"
                  radius="sm"
                  src={peer.avatarfull}
                  width={40}
                />
                <div className="flex flex-col">
                  <Link
                    className="w-fit"
                    href={`/players/${peer.account_id}`}
                  >
                    {peer.personaname}
                  </Link>
                  <span className="text-gray-400">
                    {formatDistanceToNow(new Date(peer.last_played * 1000), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>{peer.with_games}</TableCell>
            <TableCell>
              {((peer.with_win / peer.with_games) * 100).toFixed(1)}%
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
