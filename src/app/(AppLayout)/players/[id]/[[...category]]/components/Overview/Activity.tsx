"use client";
import { Tooltip } from "@nextui-org/react";
import HeatMap from "@uiw/react-heat-map";

import { GetPlayerActivityStatsQuery } from "@/graphql/player";
import { MatchGroupByDateDayHeroType, Maybe } from "@/types/types.generated";

import TableTitle from "./TableTitle";

type Props = {
  data: GetPlayerActivityStatsQuery;
};

interface HeroStat {
  heroId: number;
  matchCount: Maybe<number> | undefined;
  winCount: Maybe<number> | undefined;
}

interface GroupedStats {
  dateDay: number;
  heroes: HeroStat[];
}

function getPastDate(daysAgo: number) {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysAgo);
  return pastDate;
}

function convertUnixToDate(unixTimestamp: number): string {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}

const groupStatsByDate = (
  stats: Maybe<Array<Maybe<MatchGroupByDateDayHeroType>>>
) => {
  const groupedStats: { [dateKey: number]: GroupedStats } = {};

  stats?.forEach((stat) => {
    const dateKey = stat?.dateDay;
    if (!groupedStats[dateKey]) {
      groupedStats[dateKey] = {
        dateDay: dateKey,
        heroes: [],
      };
    }

    groupedStats[dateKey].heroes.push({
      heroId: stat?.heroId,
      matchCount: stat?.matchCount,
      winCount: stat?.winCount,
    });
  });

  return Object.values(groupedStats);
};

export default function Activity({ data }: Props) {
  const result = groupStatsByDate(
    data.player?.statsByDay as MatchGroupByDateDayHeroType[]
  );
  const value = [
    ...result.map((stat, idx) => {
      const date = convertUnixToDate(stat.dateDay);
      const matchCount = stat?.heroes?.reduce(
        (acc, b) => acc + (b?.matchCount || 0),
        0
      );
      const winCount = stat?.heroes?.reduce(
        (acc, b) => acc + (b?.winCount || 0),
        0
      );
      return {
        date: date,
        count: matchCount,
        content: (
          <div className="flex gap-1">
            <span className="text-success-400">{winCount}</span> -{" "}
            <span className="text-danger-500">{matchCount - winCount}</span>
          </div>
        ),
      };
    }),
  ];

  return (
    <div className="flex grow flex-col gap-2 rounded-large bg-content1 p-4">
      <TableTitle>Activity</TableTitle>
      <div className="flex">
        <HeatMap
          className="h-[14rem] w-full"
          legendCellSize={0}
          rectRender={(props, data) => {
            if (!data.count) return <rect {...props} />;
            return (
              <Tooltip content={data.content}>
                <rect {...props} />
              </Tooltip>
            );
          }}
          rectSize={25}
          startDate={new Date(getPastDate(90))}
          style={{
            color: "#d4d4d8",
            fontSize: "1rem",
            // "--rhm-rect": "#52525b",
          }}
          value={value}
          weekLabels={["S", "M", "T", "W", "T", "F", "S"]}
        />
      </div>
    </div>
  );
}
