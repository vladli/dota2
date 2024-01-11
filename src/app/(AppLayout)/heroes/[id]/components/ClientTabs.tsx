"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { LandPlot } from "lucide-react";

import TabHeader from "@/components/TabHeader";
import {
  GetAbilitiesQuery,
  GetAllHeroesQuery,
  GetHeroByIdQuery,
} from "@/graphql/constants";

import Matchup from "../tabs/Matchup";
import OverView from "../tabs/OverView";

type Props = {
  heroId: number;
  data: GetHeroByIdQuery;
  abilities: GetAbilitiesQuery;
  allHeroes: GetAllHeroesQuery;
};
export default function ClientTabs({
  heroId,
  data,
  abilities,
  allHeroes,
}: Props) {
  return (
    <Tabs
      classNames={{
        tabList: "bg-transparent border border-divider",
        cursor: "group-data-[selected=true]:bg-content2",
      }}
      defaultSelectedKey="Overview"
    >
      <Tab
        key="Overview"
        title={
          <TabHeader
            icon={LandPlot}
            text="Overview"
          />
        }
      >
        <OverView
          abilities={abilities}
          data={data}
        />
      </Tab>
      <Tab
        key="Matchup"
        title={
          <TabHeader
            icon={LandPlot}
            text="Matchup"
          />
        }
      >
        <Matchup
          allHeroes={allHeroes}
          hero={data}
          heroId={heroId}
        />
      </Tab>
    </Tabs>
  );
}
