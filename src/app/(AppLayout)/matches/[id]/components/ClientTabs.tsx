"use client";
import { Tab, Tabs } from "@nextui-org/react";
import { AreaChart, Trophy } from "lucide-react";

import { GetAllHeroesQuery, GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/mathch";
import { cn } from "@/lib/utils";

import TabOverview from "../tabs/TabOverview";

import PickBan from "./PickBan";

type Props = {
  data: GetMatchByIdQuery;
  items: GetAllItemsQuery;
  heroes: GetAllHeroesQuery;
};
export default function ClientTabs({ data, items, heroes }: Props) {
  return (
    <Tabs defaultSelectedKey="ability">
      <Tab
        key="overview"
        title={
          <TabHeader
            icon={AreaChart}
            text="Overview"
          />
        }
      >
        <div className="flex flex-col gap-4">
          <TabOverview
            data={data}
            items={items}
            team="Radiant"
          />

          <TabOverview
            data={data}
            items={items}
            team="Dire"
          />
        </div>
        {data.match?.pickBans && (
          <PickBan
            data={data}
            heroes={heroes}
          />
        )}
      </Tab>
      {/* <Tab
        key="ability"
        title={
          <TabHeader
            icon={GrVulnerability}
            text="Ability"
          />
        }
      >
        <Card className="gap-4 p-4">
          <Header
            text="Radiant"
            win={data.radiant_win}
          />
          <TabAbility
            data={data}
            heroes={heroes}
            items={items}
            itemsId={itemsId}
            team="Radiant"
          />
          <Header
            text="Dire"
            win={data.radiant_win}
          />
          <TabAbility
            data={data}
            heroes={heroes}
            items={items}
            itemsId={itemsId}
            team="Dire"
          />
        </Card>
      </Tab> */}
    </Tabs>
  );
}

const TabHeader = ({ text, icon: Icon }: { text: string; icon: any }) => {
  return (
    <div className="flex items-center space-x-2">
      <Icon size={18} />
      <span>{text}</span>
    </div>
  );
};

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
