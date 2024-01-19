import { useMemo } from "react";
import { Image } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { Backpack } from "lucide-react";
import Link from "next/link";

import PlayerName from "@/components/PlayerName";
import Table from "@/components/Table/Table";
import Tooltip from "@/components/Tooltip";
import { GetAllHeroesQuery, GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";
import { IMAGE } from "@/lib/constants";
import { cn, formatNumber, getRoleInfo, secondsToTime } from "@/lib/utils";
import { MatchPlayerType } from "@/types/types.generated";

import { Header } from "../ClientTabs";

type Props = {
  data: GetMatchByIdQuery;
  team: "Dire" | "Radiant";
  items: GetAllItemsQuery;
  heroes: GetAllHeroesQuery;
  time: number;
  endTime: number;
};

function compareLaneAndRole(a: any, b: any) {
  const positionOrder: any = {
    POSITION_1: 1,
    POSITION_2: 2,
    POSITION_3: 3,
    POSITION_4: 4,
    POSITION_5: 5,
  };
  const positionA = positionOrder[a.position];
  const positionB = positionOrder[b.position];

  if (positionA === undefined || positionB === undefined) {
    return 0;
  }

  return positionA - positionB;
}

export default function PlayersTable({
  data,
  team,
  items,
  heroes,
  time,
  endTime,
}: Props) {
  const match = data.match;
  const players =
    team === "Radiant"
      ? match?.players!.filter((player) => player?.isRadiant)
      : match?.players!.filter((player) => !player?.isRadiant);
  const getHero = (id: number) =>
    heroes.constants?.heroes?.find((hero) => hero?.id === id);
  const getItem = (id: number) =>
    items.constants?.items?.find((item) => item?.id === id);
  const renderPlayerItems = (player: MatchPlayerType, time: number) => {
    const playerItems: number[] = [];
    const playerBackpack: number[] = [];

    for (let i = 0; i < 6; i++) {
      const itemId = //@ts-ignore
        player?.stats?.inventoryReport?.[time + 1][`item${i}`]?.itemId;
      playerItems.push(itemId);
    }
    for (let i = 0; i < 3; i++) {
      const itemId = //@ts-ignore
        player.stats.inventoryReport?.[time + 1][`backPack${i}`]?.itemId;
      playerBackpack.push(itemId);
    }
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1">
          {playerItems.map((item, i) =>
            item ? (
              <Tooltip
                content={
                  <ToolTipContent
                    img={IMAGE.urlItem + getItem(item)?.shortName + ".png"}
                    name={getItem(item)?.displayName || ""}
                  />
                }
                key={i}
              >
                <Image
                  alt="item"
                  className="z-0 min-w-[40px]"
                  radius="none"
                  src={IMAGE.urlItem + getItem(item)?.shortName + ".png"}
                  width={40}
                />
              </Tooltip>
            ) : (
              <div
                className="h-[29.09px] w-[40px] bg-content2"
                key={i}
              />
            )
          )}
        </div>
        <div className="flex items-center gap-1">
          <Backpack
            className="text-neutral-500"
            size={20}
          />
          {playerBackpack.map((item, i) =>
            item ? (
              <Tooltip
                content={
                  <ToolTipContent
                    img={IMAGE.urlItem + getItem(item)?.shortName + ".png"}
                    name={getItem(item)?.displayName || ""}
                  />
                }
                key={i}
              >
                <Image
                  alt="item"
                  className="z-0 min-w-[40px] "
                  radius="none"
                  src={IMAGE.urlItem + getItem(item)?.shortName + ".png"}
                  width={40}
                />
              </Tooltip>
            ) : (
              <div
                className="h-[29.09px] w-[40px] bg-content2"
                key={i}
              />
            )
          )}
        </div>
      </div>
    );
  };

  const columns = useMemo<ColumnDef<MatchPlayerType, any>[]>(
    () => [
      {
        header: "Hero",
        enableSorting: false,
        size: 30,
        meta: {
          isSticky: true,
        },
        accessorFn: (row) => ({
          role: row.role,
          lane: row.lane,
          heroId: row.heroId,
          displayName: row.hero?.displayName,
          shortName: row.hero?.shortName,
        }),
        cell: ({ getValue }: any) => (
          <div className="flex items-center gap-x-2">
            <Tooltip
              content={getRoleInfo(getValue().role, getValue().lane)?.name}
            >
              <Image
                alt=""
                className="min-w-[14px]"
                height={14}
                radius="none"
                src={getRoleInfo(getValue().role, getValue().lane)?.image || ""}
                width={14}
              />
            </Tooltip>
            <Link href={`/heroes/${getValue().heroId}`}>
              <Image
                alt=""
                className="min-w-[70px]"
                src={IMAGE.url + getValue().shortName + IMAGE.horizontal}
                width={70}
              />
            </Link>
          </div>
        ),
      },
      {
        header: "Player",
        size: 250,
        minSize: 250,
        enableSorting: false,

        accessorFn: (row) => ({
          steamAccount: row.steamAccount,
          steamAccountId: row.steamAccountId,
        }),
        cell: ({ getValue }: any) => (
          <PlayerName steamAccount={getValue().steamAccount} />
        ),
      },
      {
        header: "Level",
        size: 25,
        enableSorting: false,
        accessorFn: (row) =>
          row?.stats?.level?.filter((value) => (value || 0) / 60 <= time)
            .length,
        cell: ({ getValue }: any) => (
          <span className="flex size-8 items-center justify-center rounded-full border-2 border-divider">
            {getValue()}
          </span>
        ),
      },
      {
        header: "K / D / A",
        minSize: 120,
        enableSorting: false,
        accessorFn: (row) => ({
          kills: row.stats?.killEvents?.filter(
            (kill) => (kill?.time ?? 0) / 60 <= time
          ).length,
          deaths: row.stats?.deathEvents?.filter(
            (death) => (death?.time ?? 0) / 60 <= time
          ).length,
          assists: row.stats?.assistEvents?.filter(
            (assist) => (assist?.time ?? 0) / 60 <= time
          ).length,
        }),
        cell: ({ getValue }: any) => (
          <div>
            {getValue().kills} / {getValue().deaths} / {getValue().assists}
          </div>
        ),
      },
      {
        header: "LH / DN",
        minSize: 100,
        enableSorting: false,
        accessorFn: (row) => ({
          lastHits:
            time !== endTime
              ? row.stats?.lastHitsPerMinute
                  ?.slice(0, time)
                  .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
              : row.numLastHits,
          denies:
            time !== endTime
              ? row.stats?.deniesPerMinute
                  ?.slice(0, time)
                  .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
              : row.numDenies,
        }),
        cell: ({ getValue }) => (
          <>
            {getValue().lastHits} / {getValue().denies}
          </>
        ),
      },
      {
        header: "NET",
        size: 25,
        enableSorting: false,
        accessorFn: (row) =>
          time !== endTime
            ? row.stats?.networthPerMinute?.[time]
            : row.networth,
        cell: ({ getValue }) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "GPM / XPM",
        minSize: 120,
        enableSorting: false,
        accessorFn: (row) => ({
          goldPerMinute:
            time !== endTime
              ? row.stats?.goldPerMinute?.[time - 1]
              : row.goldPerMinute,
          experiencePerMinute:
            time !== endTime
              ? Math.round(
                  row?.stats
                    ?.experiencePerMinute!.slice(0, time)!
                    .reduce((a, b) => a! + (b || 0), 0)! / time
                )
              : row.experiencePerMinute,
        }),
        cell: ({ getValue }) => (
          <>
            {getValue().goldPerMinute || 0} /{" "}
            {getValue().experiencePerMinute || 0}
          </>
        ),
      },
      {
        header: "ITEMS",
        enableSorting: false,
        accessorFn: (row) => ({ ...row }),
        cell: ({ getValue }) => <>{renderPlayerItems(getValue(), time)}</>,
      },
      {
        id: "neutralItems",
        header: "",
        enableSorting: false,
        accessorFn: (row) =>
          row?.stats?.inventoryReport?.[time + 1]?.neutral0?.itemId,
        cell: ({ getValue }: any) => {
          const item = items?.constants?.items!.find(
            (item) => item?.id === getValue()
          );
          return (
            <Tooltip
              content={
                <ToolTipContent
                  img={IMAGE.urlItem + item?.shortName + ".png"}
                  name={item?.displayName || ""}
                />
              }
            >
              <div className="size-[35px]">
                <Image
                  alt="item"
                  className="z-0 size-full object-cover "
                  radius="full"
                  removeWrapper
                  src={IMAGE.urlItem + item?.shortName + ".png"}
                  width={40}
                />
              </div>
            </Tooltip>
          );
        },
      },
      {
        header: "DMG",
        enableSorting: false,
        accessorFn: (row) =>
          time !== endTime
            ? row.stats?.heroDamagePerMinute
                ?.slice(0, time)
                .reduce((a, b) => (a ?? 0) + (b ?? 0), 0)
            : row.heroDamage,
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "BLD",
        enableSorting: false,
        accessorFn: (row) =>
          time !== endTime
            ? row.stats?.towerDamagePerMinute
                ?.slice(0, time)
                .reduce((a, b) => a ?? 0 + (b ?? 0), 0)
            : row.towerDamage,
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "HEAL",
        enableSorting: false,
        accessorFn: (row) =>
          time !== endTime
            ? row.stats?.healPerMinute
                ?.slice(0, time)
                .reduce((a, b) => a ?? 0 + (b ?? 0), 0)
            : row.heroHealing,
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "DEATH GOLD",
        enableSorting: false,
        accessorFn: (row) => {
          const val = row.stats?.deathEvents
            ?.filter((death) => death?.time ?? 0 / 60 <= time)
            .reduce((a, b) => a + (b?.goldLost ?? 0), 0);
          return val;
        },
        cell: ({ getValue }) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "DEATH TIME",
        enableSorting: false,
        accessorFn: (row) => {
          const val = row.stats?.deathEvents
            ?.filter((death) => (death?.time ?? 0) / 60 <= time)
            .reduce((a, b) => a + (b?.timeDead ?? 0), 0);
          return val;
        },
        cell: ({ getValue }) => <>{secondsToTime(getValue()!)}</>,
      },
      {
        header: "KILLS",
        enableSorting: false,
        accessorFn: (row) => ({
          killEvents: row.stats?.killEvents?.filter(
            (death) => (death?.time ?? 0) / 60 <= time
          ),
          playerTeam: row.isRadiant,
        }),
        cell: ({ getValue }) => {
          const getKills = (heroId: number) =>
            getValue().killEvents?.filter((kill: any) => kill.target == heroId)
              .length;
          const enemyHeroes = data?.match?.players?.filter(
            (player) => player?.isRadiant !== getValue().playerTeam
          );
          return (
            <div className="flex gap-x-2">
              {enemyHeroes?.map((hero) => (
                <div
                  className="flex items-center gap-x-1 rounded-large bg-content1 px-3"
                  key={hero?.heroId}
                >
                  <Image
                    alt=""
                    className={cn("min-w-[30px] z-0", {
                      grayscale: getKills(hero?.heroId) === 0,
                    })}
                    height={30}
                    src={IMAGE.url + hero?.hero?.shortName + IMAGE.icon}
                    width={30}
                  />
                  {getKills(hero?.heroId) > 0 ? getKills(hero?.heroId) : "-"}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        header: "Support Items",
        enableSorting: false,
        accessorFn: (row) => ({
          itemPurchases: row.stats?.itemPurchases?.filter(
            (item) => item?.time ?? 0 / 60 <= time
          ),
        }),
        cell: ({ getValue }: any) => {
          const observerWards = getValue().itemPurchases?.filter(
            (item: any) => item.itemId == 42
          );
          const sentryWards = getValue().itemPurchases?.filter(
            (item: any) => item.itemId == 43
          );
          const dusts = getValue().itemPurchases?.filter(
            (item: any) => item.itemId == 40
          );
          const sod = getValue().itemPurchases?.filter(
            (item: any) => item.itemId == 188
          );
          const renderItem = (itemId: number, count: number) => {
            return (
              <Tooltip
                content={
                  <ToolTipContent
                    img={IMAGE.urlItem + getItem(itemId)?.shortName + ".png"}
                    name={getItem(itemId)?.displayName || ""}
                  />
                }
              >
                <div className="flex w-fit items-center gap-x-1 rounded-large bg-content1 px-3">
                  <Image
                    alt="item"
                    className="z-0 min-w-[40px]"
                    src={IMAGE.urlItem + getItem(itemId)?.shortName + ".png"}
                    width={40}
                  />
                  <span>x{count}</span>
                </div>
              </Tooltip>
            );
          };
          return (
            <div className="flex gap-x-2">
              {observerWards?.length
                ? renderItem(42, observerWards.length)
                : null}
              {sentryWards?.length ? renderItem(43, sentryWards.length) : null}
              {dusts?.length ? renderItem(40, dusts.length) : null}
              {sod?.length ? renderItem(188, sod.length) : null}
            </div>
          );
        },
      },
      {
        header: "CAMP STACK",
        enableSorting: false,
        accessorFn: (row) => {
          const [last] = row.stats?.campStack?.slice(-1) ?? [];
          return time !== endTime
            ? row.stats?.campStack?.[time - 1] || "-"
            : last || "-";
        },
        cell: ({ getValue }: any) => <>{getValue()}</>,
      },
    ],
    [time]
  );
  return (
    <section className="flex flex-col gap-y-4 rounded-large border border-divider p-4">
      <Header
        showWin
        text={team}
        win={match?.didRadiantWin!}
      />
      <Table
        columns={columns}
        data={players?.sort(compareLaneAndRole) as object[]}
      />
    </section>
  );
}

function ToolTipContent({ img, name }: { img: string; name: string }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        alt=""
        src={img}
        width={60}
      />
      <span className="font-medium">{name}</span>
    </div>
  );
}
