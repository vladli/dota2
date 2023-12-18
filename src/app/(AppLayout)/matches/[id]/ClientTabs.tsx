"use client";
import { AiOutlineFundView } from "react-icons/ai";
import { GrTrophy } from "react-icons/gr";
import { Card, Tab, Tabs } from "@nextui-org/react";

import { cn } from "@/lib/utils";
import { IHero, IItems, IItemsId, IMatchDetails } from "@/types/types";

import TabOverview from "./tabs/TabOverview";

type Props = {
  data: IMatchDetails;
  heroes: IHero[];
  items: IItems;
  itemsId: IItemsId;
};
export default function ClientTabs({ data, heroes, items, itemsId }: Props) {
  return (
    <Tabs className="mt-10">
      <Tab
        key="photos"
        title={
          <div className="flex items-center space-x-2">
            <AiOutlineFundView />
            <span>Overview</span>
          </div>
        }
      >
        <Card className="gap-4 p-4">
          <Header
            text="Radiant"
            win={data.radiant_win}
          />
          <TabOverview
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
          <TabOverview
            data={data}
            heroes={heroes}
            items={items}
            itemsId={itemsId}
            team="Dire"
          />
        </Card>
      </Tab>
    </Tabs>
  );
}

const Header = ({ text, win }: { text: string; win: boolean }) => {
  const open = (text === "Radiant" && win) || (text === "Dire" && !win);

  return (
    <h1
      className={cn(
        "w-fit text-xl uppercase font-semibold flex gap-2 items-center",
        {
          "text-emerald-500": text === "Radiant",
          "text-red-500": text === "Dire",
        }
      )}
    >
      {text} {open ? <GrTrophy /> : null}
    </h1>
  );
};
