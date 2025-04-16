"use client";
import { Image } from "@heroui/react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { GetPlayerBySteamIdQuery } from "@/graphql/player";
import { IMAGE } from "@/lib/constants";

type Props = {
  data: GetPlayerBySteamIdQuery;
};

type HeroStats = {
  heroId: number;
  count: number;
  wins: number;
  shortName: string | null | undefined;
  displayName: string | null | undefined;
};

export default function Trends({ data }: Props) {
  if (!data.player?.matches?.length) return null;
  const heroStatsArray: HeroStats[] = [];
  data.player?.matches?.forEach((match) => {
    const heroId = match?.players?.[0]?.heroId;
    let heroStat = heroStatsArray.find((stat) => stat.heroId === heroId);

    if (!heroStat) {
      heroStat = {
        heroId: heroId,
        count: 0,
        wins: 0,
        shortName: match?.players?.[0]?.hero?.shortName,
        displayName: match?.players?.[0]?.hero?.displayName,
      };
      heroStatsArray.push(heroStat);
    }
    heroStat.count++;

    if (match?.players?.[0]?.isVictory) {
      heroStat.wins++;
    }
  });
  heroStatsArray.sort((a, b) => b.count - a.count);
  return (
    <div className="size-[320px]">
      <ResponsiveContainer height="100%" width="100%">
        <PieChart height={320} width={320}>
          <Pie
            cx="50%"
            cy="50%"
            data={heroStatsArray}
            dataKey="count"
            endAngle={450}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => (
              <RenderCustomizedLabel
                cx={cx}
                cy={cy}
                heroStatsArray={heroStatsArray}
                index={index}
                innerRadius={innerRadius}
                midAngle={midAngle}
                outerRadius={outerRadius}
              />
            )}
            labelLine={false}
            minAngle={10}
            outerRadius={140}
            startAngle={90}
          >
            {heroStatsArray.map((_, index) => (
              <Cell
                className="fill-content2 stroke-content3"
                key={`cell-${index}`}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

type RenderCustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  index: number;
  heroStatsArray: HeroStats[];
};
const RADIAN = Math.PI / 180;
const RenderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
  heroStatsArray,
}: RenderCustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <svg height={24} textAnchor={"middle"} width={24} x={x - 12} y={y - 12}>
      <image
        height="100%"
        href={IMAGE.url + heroStatsArray[index].shortName + IMAGE.icon}
        width="100%"
      />
    </svg>
  );
};

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const shortName = payload[0]?.payload?.shortName;
    const displayName = payload[0]?.payload?.displayName;
    const matches = payload[0]?.payload?.count;
    const wins = payload[0]?.payload?.wins;
    return (
      <div className="flex items-center gap-2 rounded-large bg-content1 p-2">
        <Image alt="Icon" src={IMAGE.url + shortName + IMAGE.icon} />
        <div className="flex flex-col items-center">
          <p>{displayName}</p>
          <p>
            <span className="text-success-400">{wins}</span>
            {" - "}
            <span className="text-danger-500">{matches - wins}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}
