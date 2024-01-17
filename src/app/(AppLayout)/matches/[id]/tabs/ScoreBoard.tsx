import { useState } from "react";
import { Slider, SliderValue } from "@nextui-org/react";

import Alert from "@/components/Alert";
import { GetAllHeroesQuery, GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";
import { minutesToTime } from "@/lib/utils";

import PlayersTable from "../components/TabScoreBoard/PlayersTable";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
  items: GetAllItemsQuery;
};
export default function ScoreBoard({ data, heroes, items }: Props) {
  const time =
    data?.match?.players?.[0]?.stats?.networthPerMinute?.length || 1 || 0;
  const [value, setValue] = useState<SliderValue>(time);
  if (data?.match?.players?.[0]?.stats?.experiencePerMinute === null)
    return <Alert text="No data available." />;
  return (
    <>
      <div className="mb-4 rounded-large border border-divider p-2">
        <Slider
          aria-label="Time"
          color="foreground"
          defaultValue={time}
          endContent={minutesToTime(time as number)}
          maxValue={time}
          minValue={0}
          onChangeEnd={setValue}
          showTooltip={true}
          size="sm"
          startContent={minutesToTime(value as number)}
          step={1}
          tooltipProps={{ color: "default" }}
        />
      </div>
      <div className="flex flex-col gap-4">
        <PlayersTable
          data={data}
          endTime={time}
          heroes={heroes}
          items={items}
          team="Radiant"
          time={value as number}
        />

        <PlayersTable
          data={data}
          endTime={time}
          heroes={heroes}
          items={items}
          team="Dire"
          time={value as number}
        />
      </div>
    </>
  );
}
