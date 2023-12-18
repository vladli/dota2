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

import { STEAM_IMAGE } from "@/lib/constants";
import { getHeroById } from "@/lib/utils";
import { IFavoriteHeroes, IHero } from "@/types/types";

type Props = {
  data: IFavoriteHeroes[];
  heroes: IHero[];
};
export default function FavoriteHeroesTable({ data, heroes }: Props) {
  return (
    <Table
      aria-label="PlayedWithTable"
      classNames={{
        base: "border p-1 rounded-xl border-content2",
        wrapper: "bg-transparent shadow-none",
      }}
    >
      <TableHeader>
        <TableColumn>HERO</TableColumn>
        <TableColumn>MATCHES</TableColumn>
        <TableColumn>WIN RATE</TableColumn>
      </TableHeader>
      <TableBody>
        {data.slice(0, 10).map((hero) => {
          const getHero = getHeroById(heroes, hero.hero_id);
          return (
            <TableRow key={hero.hero_id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    alt=""
                    className="min-w-[60px]"
                    radius="none"
                    src={STEAM_IMAGE + getHero?.img}
                    width={60}
                  />
                  <div className="flex flex-col">
                    <Link
                      className="w-fit"
                      href={`/heroes/${hero.hero_id}`}
                    >
                      {getHero?.localized_name}
                    </Link>
                    <span className="text-gray-400">
                      {formatDistanceToNow(new Date(hero.last_played * 1000), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>{hero.games}</TableCell>
              <TableCell>
                {((hero.win / hero.games) * 100).toFixed(1)}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
