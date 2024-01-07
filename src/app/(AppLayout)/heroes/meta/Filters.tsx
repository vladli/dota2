import { Fragment } from "react";
import { HeaderGroup } from "@tanstack/react-table";

import DaysFilter from "./filters/DaysFilter";
import HeroesFilter from "./filters/HeroesFilter";
import RankFilter from "./filters/RankFilter";

type Props = {
  headerGroups: HeaderGroup<any>[];
};
export default function Filters({ headerGroups }: Props) {
  return (
    <section className="mb-4 flex flex-wrap items-center gap-2">
      {headerGroups.map((headerGroup) => (
        <Fragment key={headerGroup.id}>
          {headerGroup.headers[0].isPlaceholder ? null : (
            <>
              {headerGroup.headers[0].column.getCanFilter() && (
                <HeroesFilter column={headerGroup.headers[0].column} />
              )}
            </>
          )}
        </Fragment>
      ))}
      <DaysFilter />
      <RankFilter />
    </section>
  );
}
