import { GrTrophy } from "react-icons/gr";
import { Card, cn, Tooltip } from "@nextui-org/react";

import {
  getHeroStats,
  getItems,
  getItemsId,
  getMatch,
} from "@/actions/actions";

import TabOverview from "./tabs/TabOverview";
export default async function ServerTabs() {
  const data = await getMatch("7489061055");
  const heroes = await getHeroStats();
  const itemsId = await getItemsId();
  const items = await getItems();
  return (
    <div>
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
      </Card>
    </div>
  );
}
const Header = ({ text, win }: { text: string; win: boolean }) => {
  const open = (text === "Radiant" && win) || (text === "Dire" && !win);

  return (
    <Tooltip
      color="primary"
      content={<GrTrophy />}
      isOpen={open}
      placement="right"
      showArrow
    >
      <h1
        className={cn("w-fit text-xl uppercase font-semibold", {
          "text-emerald-500": text === "Radiant",
          "text-red-500": text === "Dire",
        })}
      >
        {text}
      </h1>
    </Tooltip>
  );
};
