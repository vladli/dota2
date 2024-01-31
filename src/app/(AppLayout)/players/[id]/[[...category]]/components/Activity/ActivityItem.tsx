"use client";
import { useEffect, useRef } from "react";
//@ts-expect-error
import CalHeatMap from "cal-heatmap";
//@ts-expect-error
import CalendarLabel from "cal-heatmap/plugins/CalendarLabel";
//@ts-expect-error
import Tooltip from "cal-heatmap/plugins/Tooltip";

import Container from "@/components/Container";
import { GetPlayerActivityStatsQuery } from "@/graphql/player";
import dayjs from "@/lib/dayjs";
import { MatchGroupByDateDayHeroType, Maybe } from "@/types/types.generated";

import TableTitle from "../Overview/TableTitle";

type Props = {
  data: GetPlayerActivityStatsQuery | null;
  year: number;
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

export default function ActivityItem({ data, year }: Props) {
  const heatmapRef = useRef(null);

  const result = groupStatsByDate(
    data?.player?.statsByDay as MatchGroupByDateDayHeroType[]
  );
  const value = [
    ...result.map((stat) => {
      const date = dayjs(stat.dateDay * 1000).format("YYYY-MM-DD");
      const matchCount = stat?.heroes?.reduce(
        (acc, b) => acc + (b?.matchCount || 0),
        0
      );

      return {
        date: date,
        value: matchCount,
      };
    }),
  ];

  const calOptions = {
    data: {
      source: value,
      type: "json",
      x: "date",
      y: "value",
    },
    itemSelector: `#calendar-${year}`,
    date: {
      start: new Date(`${year}-01-01`),
      locale: {
        weekStart: 1,
      },
      highlight: [
        new Date(), // Highlight today
      ],
    },
    range: 12,
    scale: {
      color: {
        type: "threshold",
        range: ["#14432a", "#166b34", "#37a446", "#4dd05a"],
        domain: [3, 5, 8],
      },
    },
    domain: {
      type: "month",
      gutter: 12,
      label: {
        text: "MMM",
        textAlign: "middle",
        position: "top",
      },
    },
    subDomain: {
      type: "day",
      label: "DD",
      radius: 1,
      width: 24,
      height: 24,
      gutter: 4,
    },
    theme: "dark",
  };

  useEffect(() => {
    if (!heatmapRef.current) {
      const cal = new CalHeatMap();
      cal.paint(calOptions, [
        [
          Tooltip,
          {
            text: function (date: Date, value: number) {
              const val = value ? value : 0;
              return `${val} matches on ${dayjs(date).format(
                "dddd, MMMM D, YYYY"
              )}`;
            },
          },
        ],
        [
          CalendarLabel,
          {
            width: 30,
            textAlign: "start",
            text: () => ["M", "T", "W", "T", "F", "S", "S"].map((d) => d),
            padding: [25, 0, 0, 0],
          },
        ],
      ]);
      heatmapRef.current = cal;
    }
    return () => {
      if (heatmapRef.current) {
        (heatmapRef.current as CalHeatMap | null)?.destroy();
      }
    };
  }, []);

  if (!data) return null;
  return (
    <Container className="flex flex-col gap-2">
      <TableTitle>{year}</TableTitle>
      <section className="flex justify-center">
        <div
          className="w-fit overflow-x-auto rounded-large border border-divider p-3 scrollbar-thin scrollbar-thumb-content2"
          id={`calendar-${year}`}
        ></div>
      </section>
    </Container>
  );
}
