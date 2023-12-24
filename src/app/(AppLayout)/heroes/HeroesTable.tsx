"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  Link,
  SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetHeroesStatsQuery } from "@/graphql/heroStats";
import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroStatsProps = {
  pick: number;
  win: number;
};
const HeroStats = ({ pick, win }: HeroStatsProps) => {
  const winRate = Math.floor((win / pick) * 100);
  const pickRate = Number(((pick / pick) * 100).toFixed(1));
  return (
    <div className="flex justify-evenly gap-1">
      <div className="flex flex-col items-center">
        <span>{pick}</span>
        <span
          className={cn({
            "text-danger-300": pickRate < 10,
            "text-warning-300": pickRate >= 10 && pickRate <= 15,
            "text-success-300": pickRate > 15,
          })}
        >
          {pickRate}%
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>{win}</span>
        <span
          className={cn({
            "text-danger-300": winRate <= 45,
            "text-warning-300": winRate > 45 && winRate <= 49,
            "text-success-300": winRate >= 50,
          })}
        >
          {winRate}%
        </span>
      </div>
    </div>
  );
};

type Props = {
  data: GetHeroesStatsQuery;
  heroes: GetAllHeroesQuery;
};

const columns = [
  { name: "Hero", key: "displayName" },
  { name: "Start", key: "winCount" },
  { name: "Current", key: "current" },
  { name: "+/-", key: "difference" },
];

export default function HeroesTable({ data, heroes }: Props) {
  const searchParams = useSearchParams();
  const [loadedHeroes, setLoadedHeroes] = useState(heroes.constants!.heroes!);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "current",
    direction: "descending",
  });
  const [sortedItems, setSortedItems] = useState(loadedHeroes);

  useEffect(() => {
    setSortedItems(sortFunction(loadedHeroes, sortDescriptor));
  }, [sortDescriptor]);

  useEffect(() => {
    if (searchParams.get("heroId")) {
      const heroIds =
        searchParams
          .get("heroId")
          ?.split(",")
          .map((id) => parseInt(id.trim(), 10)) || [];

      const filteredHeroes =
        heroes.constants?.heroes?.filter((hero) =>
          heroIds.includes(hero?.id)
        ) || [];
      setSortedItems(filteredHeroes);
    } else setSortedItems(sortFunction(loadedHeroes, sortDescriptor));
  }, [searchParams]);

  const renderCell = useCallback((data: any, columnKey: React.Key) => {
    const cellValue = columnKey
      .toString()
      .split(".")
      .reduce((obj, key) => obj?.[key], data);

    const length = data?.stats.length - 1;

    const winRate =
      (data?.stats?.[length]?.winCount! / data?.stats?.[length]?.matchCount!) *
      100;
    const winRateEnd =
      (data?.stats?.[0]?.winCount! / data?.stats?.[0]?.matchCount!) * 100;
    const difference = winRateEnd - winRate;
    switch (columnKey) {
      case "displayName":
        return (
          <div className="flex items-center gap-2">
            <Image
              alt="Hero"
              className="min-w-[70px]"
              radius="sm"
              src={IMAGE.url + data?.shortName + IMAGE.horizontal}
              width={70}
            />
            <Link
              as={NextLink}
              href={`/heroes/${data?.id}`}
            >
              {data?.displayName}
            </Link>
          </div>
        );
      case "winCount": {
        return (
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-default-400">
              {winRate.toFixed(1)}%
            </p>
          </div>
        );
      }
      case "current": {
        return (
          <div className="flex flex-col">
            <p className="text-sm font-semibold capitalize text-default-400">
              {winRateEnd.toFixed(1)}%
            </p>
          </div>
        );
      }
      case "difference": {
        return (
          <div className="flex flex-col">
            <p
              className={cn(
                "text-sm font-semibold capitalize text-default-400",
                {
                  "text-green-400": difference > 0,
                  "text-red-400": difference < 0,
                }
              )}
            >
              {difference.toFixed(1)}%
            </p>
          </div>
        );
      }
      default:
        return cellValue;
    }
  }, []);

  const sortFunction = (items: any, sortDescriptor: SortDescriptor) => {
    const { column, direction } = sortDescriptor;
    const getColumnValue = (item: any) => {
      return column
        ?.toString()
        .split(".")
        .reduce((obj: any, key: string) => obj?.[key], item);
    };
    return [...items]?.sort((a, b) => {
      const valueA = getColumnValue(a);
      const valueB = getColumnValue(b);
      const length = a.stats.length - 1;

      if (column === "winCount") {
        const propertyToSort = "winCount";
        const subValueA =
          a.stats[length]?.[propertyToSort] / a.stats[length]?.matchCount;
        const subValueB =
          b.stats[length]?.[propertyToSort] / b.stats[length]?.matchCount;
        return (direction === "ascending" ? 1 : -1) * (subValueA - subValueB);
      }
      if (column === "current") {
        const propertyToSort = "winCount";
        const subValueA = a.stats[0]?.[propertyToSort] / a.stats[0]?.matchCount;
        const subValueB = b.stats[0]?.[propertyToSort] / b.stats[0]?.matchCount;
        return (direction === "ascending" ? 1 : -1) * (subValueA - subValueB);
      }
      if (typeof valueA === "number" && typeof valueB === "number") {
        return (direction === "ascending" ? 1 : -1) * (valueA - valueB);
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return direction === "ascending"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return 0;
    });
  };

  return (
    <>
      <Table
        aria-label="HeroesTable"
        isHeaderSticky={true}
        onSortChange={setSortDescriptor}
        sortDescriptor={sortDescriptor}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              allowsSorting={column.key !== "difference"}
              key={column.key}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems}>
          {(item) => (
            <TableRow key={item?.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
