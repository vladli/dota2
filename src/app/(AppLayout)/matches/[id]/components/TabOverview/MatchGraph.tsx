import { Divider } from "@nextui-org/react";
import { CircleDollarSign, Minus } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/mathch";
import { cn, formatNumber } from "@/lib/utils";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};
export default function MatchGraph({ data, heroes }: Props) {
  const radiantNetworthLeads = data.match?.radiantNetworthLeads || [];
  const radiantExperienceLeads = data.match?.radiantExperienceLeads || [];
  const chartData = radiantNetworthLeads.map((value, index) => ({
    time: index,
    networthLead: value,
    experienceLead: radiantExperienceLeads[index],
  }));
  const radiantNetworthNumbers = radiantNetworthLeads.filter(
    (value) => typeof value === "number"
  ) as number[];
  const radiantExperienceNumbers = radiantExperienceLeads.filter(
    (value) => typeof value === "number"
  ) as number[];
  const minValue = Math.min(
    ...radiantNetworthNumbers,
    ...radiantExperienceNumbers,
    0
  );
  const maxValue = Math.max(
    ...radiantNetworthNumbers,
    ...radiantExperienceNumbers,
    0
  );

  const gradientOffset = () => {
    const dataMax = Math.max(...radiantNetworthNumbers.map((i) => i));
    const dataMin = Math.min(...radiantNetworthNumbers.map((i) => i));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  const off = gradientOffset();
  return (
    <ResponsiveContainer
      className="max-w-[50rem] rounded-large border border-divider p-1"
      height={300}
    >
      <AreaChart
        data={chartData}
        height={300}
        width={800}
      >
        <defs>
          <linearGradient
            id="splitColor"
            x1="0"
            x2="0"
            y1="0"
            y2="1"
          >
            <stop
              offset={off}
              stopColor="#16a34a"
              stopOpacity={0.8}
            />
            <stop
              offset={off}
              stopColor="#ef4444"
              stopOpacity={0.8}
            />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#666" />
        <XAxis
          dataKey="time"
          interval={9}
        />
        <YAxis
          allowDataOverflow={true}
          domain={["auto", "auto"]}
          type="number"
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />

        <Area
          dataKey="networthLead"
          fill="url(#splitColor)"
          fillOpacity={1}
          name="Networth Lead"
          stroke="url(#splitColor)"
          type="monotone"
        />
        <Area
          dataKey="experienceLead"
          fill="#171717"
          fillOpacity={0.5}
          name="Experience Lead"
          stroke="#171717"
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const netWorth = payload[0].payload.networthLead;
    const experience = payload[0].payload.experienceLead;
    return (
      <div className="rounded-large bg-content1 p-2">
        <p className="">{`Time: ${payload[0].payload.time}`}:00</p>
        <Divider className="my-2" />
        <p
          className={cn("flex items-center gap-1", {
            "text-success-400": netWorth >= 0,
            "text-danger-500": netWorth < 0,
          })}
        >
          {netWorth >= 0 ? "Radiant" : "Dire"}
          {":"}
          <span className="flex items-center gap-1 text-yellow-400">
            <CircleDollarSign size={16} /> {formatNumber(Math.abs(netWorth))}
          </span>
        </p>
        <p>
          <span
            className={cn({
              "text-success-400": netWorth >= 0,
              "text-danger-500": netWorth < 0,
            })}
          >
            {experience >= 0 ? "Radiant" : "Dire"}
            {": "}
          </span>
          {formatNumber(Math.abs(experience))} XP
        </p>
      </div>
    );
  }

  return null;
}

function CustomLegend({ payload }: any) {
  return (
    <div className="flex items-center justify-center gap-2">
      {payload.map((entry: any, index: number) => (
        <div
          className="flex items-center gap-1"
          key={`item-${index}`}
        >
          <span className="block rounded-full" />
          {entry.dataKey === "networthLead" ? (
            <>
              <Minus color="#16a34a" />
              <Minus color="#ef4444" />
            </>
          ) : (
            <Minus color="#666" />
          )}
          <p className="text-sm">{entry.value}</p>
        </div>
      ))}
    </div>
  );
}
