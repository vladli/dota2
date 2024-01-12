import { useMemo } from "react";
import { Image } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { Backpack } from "lucide-react";
import Link from "next/link";

import Table from "@/components/Table/Table";
import Tooltip from "@/components/Tooltip";
import { GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/mathch";
import { IMAGE } from "@/lib/constants";
import { formatNumber, getRankName, getRoleInfo } from "@/lib/utils";
import { MatchPlayerType } from "@/types/types.generated";

import { Header } from "../ClientTabs";

type Props = {
  data: GetMatchByIdQuery;
  team: "Dire" | "Radiant";
  items: GetAllItemsQuery;
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

export default function PlayersTable({ data, team, items }: Props) {
  const match = data.match;
  const players =
    team === "Radiant"
      ? match?.players!.filter((player) => player?.isRadiant)
      : match?.players!.filter((player) => !player?.isRadiant);

  const renderPlayerItems = (player: MatchPlayerType) => {
    const playerItems: number[] = [];
    const playerBackpack: number[] = [];
    const getItem = (id: number) =>
      items.constants?.items?.find((item) => item?.id === id);
    for (let i = 0; i < 6; i++) {
      //@ts-ignore
      const itemId = player[`item${i}Id`];
      playerItems.push(itemId);
    }
    for (let i = 0; i < 3; i++) {
      //@ts-ignore
      const itemId = player[`backpack${i}Id`];
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
                  className="min-w-[40px]"
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
                  className="min-w-[40px]"
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

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: "role",
        header: "",
        enableSorting: false,
        size: 30,
        meta: {
          isSticky: true,
        },
        accessorFn: (row) => ({
          role: row.role,
          lane: row.lane,
        }),
        cell: ({ getValue }: any) => (
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
        ),
      },
      {
        header: "Player",
        size: 250,
        minSize: 250,
        enableSorting: false,
        meta: {
          isSticky: true,
        },
        accessorFn: (row) => ({
          player: row.steamAccount.name,
          playerRank: row.steamAccount.seasonRank,
          steamAccountId: row.steamAccountId,
          heroId: row.heroId,
          displayName: row.hero.displayName,
          shortName: row.hero.shortName,
        }),
        cell: ({ getValue }: any) => {
          const rank = getRankName(getValue().playerRank.toString()[0]);
          return (
            <div className="flex items-center gap-2">
              <Link href={`/heroes/${getValue().heroId}`}>
                <Image
                  alt=""
                  className="min-w-[70px]"
                  src={IMAGE.url + getValue().shortName + IMAGE.horizontal}
                  width={70}
                />
              </Link>
              <div className="flex flex-col">
                <Link href={`/players/${getValue().steamAccountId}`}>
                  {getValue().player}
                </Link>
                <span className="text-sm text-foreground-400">
                  {rank} {getValue()?.playerRank?.toString()[1]}
                </span>
              </div>
            </div>
          );
        },
      },
      {
        header: "Level",
        accessorKey: "level",
        size: 25,
        enableSorting: false,
        cell: ({ getValue }: any) => (
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-divider">
            {getValue()}
          </span>
        ),
      },
      {
        header: "K / D / A",
        minSize: 110,
        enableSorting: false,
        accessorFn: (row) => ({
          kills: row.kills,
          deaths: row.deaths,
          assists: row.assists,
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
          lastHits: row.numLastHits,
          denies: row.numDenies,
        }),
        cell: ({ getValue }: any) => (
          <>
            {getValue().lastHits} / {getValue().denies}
          </>
        ),
      },
      {
        header: "NET",
        size: 25,
        enableSorting: false,
        accessorKey: "networth",
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "GPM / XPM",
        minSize: 110,
        enableSorting: false,
        accessorFn: (row) => ({
          goldPerMinute: row.goldPerMinute,
          experiencePerMinute: row.experiencePerMinute,
        }),
        cell: ({ getValue }: any) => (
          <>
            {getValue().goldPerMinute} / {getValue().experiencePerMinute}
          </>
        ),
      },
      {
        header: "DMG",
        enableSorting: false,
        accessorKey: "heroDamage",
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "BLD",
        enableSorting: false,
        accessorKey: "towerDamage",
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "HEAL",
        enableSorting: false,
        accessorKey: "heroHealing",
        cell: ({ getValue }: any) => <>{formatNumber(getValue()!)}</>,
      },
      {
        header: "ITEMS",
        enableSorting: false,
        accessorFn: (row) => ({ ...row }),
        cell: ({ getValue }: any) => <>{renderPlayerItems(getValue())}</>,
      },
      {
        id: "neutralItems",
        header: "",
        enableSorting: false,
        accessorKey: "neutral0Id",
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
              <div className="h-[35px] w-[35px]">
                <Image
                  alt="item"
                  className="h-full w-full object-cover"
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
    ],
    []
  );
  return (
    <section className="flex flex-col gap-y-4 rounded-large border border-divider p-4">
      <Header
        showWin
        text={team}
        win={match?.didRadiantWin!}
      />
      <div className="overflow-x-auto rounded-large border border-divider">
        <Table
          columns={columns}
          data={players?.sort(compareLaneAndRole) || []}
        />
      </div>
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
