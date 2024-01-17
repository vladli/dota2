"use client";
import { Tab, Tabs } from "@nextui-org/react";
import {
  AreaChart,
  LandPlot,
  PercentDiamond,
  ScrollText,
  Trophy,
} from "lucide-react";

import TabHeader from "@/components/TabHeader";
import { GetAllHeroesQuery, GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";
import { cn } from "@/lib/utils";

import TabLanes from "../tabs/Lanes";
import TabLogs from "../tabs/Logs";
import TabOverview from "../tabs/Overview";
import ScoreBoard from "../tabs/ScoreBoard";

type Props = {
  data: GetMatchByIdQuery;
  items: GetAllItemsQuery;
  heroes: GetAllHeroesQuery;
};
export default function ClientTabs({ data, items, heroes }: Props) {
  return (
    <Tabs
      classNames={{
        base: "overflow-x-auto block",
        tabList: "bg-transparent border border-divider",
        cursor: "group-data-[selected=true]:bg-content2",
        tab: "max-w-fit",
      }}
      defaultSelectedKey="overview"
    >
      <Tab
        key="overview"
        title={
          <TabHeader
            icon={AreaChart}
            text="Overview"
          />
        }
      >
        <TabOverview
          data={data}
          heroes={heroes}
          items={items}
        />
      </Tab>
      {data.match?.parsedDateTime && (
        <Tab
          key="scoreboard"
          title={
            <TabHeader
              icon={PercentDiamond}
              text="Scoreboard"
            />
          }
        >
          <ScoreBoard
            data={data}
            heroes={heroes}
            items={items}
          />
        </Tab>
      )}
      {data.match?.parsedDateTime && (
        <Tab
          key="lanes"
          title={
            <TabHeader
              icon={LandPlot}
              text="Lanes"
            />
          }
        >
          <TabLanes matchId={data.match?.id} />
        </Tab>
      )}
      {data.match?.parsedDateTime && (
        <Tab
          key="logs"
          title={
            <TabHeader
              icon={ScrollText}
              text="Logs"
            />
          }
        >
          <TabLogs
            data={data}
            heroes={heroes}
          />
        </Tab>
      )}
    </Tabs>
  );
}

export const Header = ({
  text,
  win,
  showWin = false,
}: {
  text: string;
  win: boolean;
  showWin?: boolean;
}) => {
  const open = (text === "Radiant" && win) || (text === "Dire" && !win);

  return (
    <h1
      className={cn(
        "w-fit text-xl uppercase font-semibold flex gap-2 items-center",
        {
          "text-success-400": text === "Radiant",
          "text-danger-500": text === "Dire",
        }
      )}
    >
      {text} {open && showWin ? <Trophy /> : null}
    </h1>
  );
};
