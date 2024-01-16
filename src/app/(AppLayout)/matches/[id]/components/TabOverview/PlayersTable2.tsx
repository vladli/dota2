import {
  Image,
  Link,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { Backpack } from "lucide-react";
import NextLink from "next/link";

import Tooltip from "@/components/Tooltip";
import { GetAllItemsQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";
import { IMAGE } from "@/lib/constants";
import { getRankName, getRoleInfo } from "@/lib/utils";
import { MatchPlayerType } from "@/types/types.generated";

import { Header } from "../ClientTabs";

const TABLE_HEADER = [
  "Player",
  "LVL",
  "K",
  "D",
  "A",
  "LH / DN",
  "NET",
  "GPM / XPM",
  "DMG",
  "BLD",
  "HEAL",
  "ITEMS",
  "",
];

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

export default function PlayersTable2({ data, team, items }: Props) {
  const match = data.match;
  const players =
    team === "Radiant"
      ? match?.players!.filter((player) => player?.isRadiant)
      : match?.players!.filter((player) => !player?.isRadiant);

  let totalKills = 0,
    totalDeaths = 0,
    totalAssists = 0,
    totalLastHits = 0,
    totalDenies = 0,
    totalNetWorth = 0,
    totalGoldPerMin = 0,
    totalXpPerMin = 0,
    totalHeroDamage = 0,
    totalTowerDamage = 0,
    totalHeroHealing = 0;
  const formatNumber = (num: number) => {
    if (!num) return "-";
    if (num < 1000) {
      return num.toString();
    }
    return (
      (num / 1000).toLocaleString(undefined, {
        maximumFractionDigits: 1,
      }) + "k"
    );
  };

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

  const renderNeutralItem = (id: number) => {
    const item = items?.constants?.items!.find((item) => item?.id === id);
    if (item) {
      return (
        <Tooltip
          content={
            <ToolTipContent
              img={IMAGE.urlItem + item.shortName + ".png"}
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
              src={IMAGE.urlItem + item.shortName + ".png"}
              width={40}
            />
          </div>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <Table
      aria-label="Overview"
      shadow="none"
      topContent={
        <Header
          showWin
          text={team}
          win={match?.didRadiantWin!}
        />
      }
    >
      <TableHeader>
        {TABLE_HEADER.map((header) => (
          <TableColumn key={header}>{header}</TableColumn>
        ))}
      </TableHeader>

      <TableBody>
        {
          players!.sort(compareLaneAndRole).map((player, i) => {
            totalKills += player?.kills;
            totalDeaths += player?.deaths;
            totalAssists += player?.assists;
            totalLastHits += player?.numLastHits;
            totalDenies += player?.numDenies;
            totalNetWorth += player?.networth!;
            totalGoldPerMin += player?.goldPerMinute;
            totalXpPerMin += player?.experiencePerMinute;
            totalHeroDamage += player?.heroDamage!;
            totalTowerDamage += player?.towerDamage!;
            totalHeroHealing += player?.heroHealing!;
            const rank = getRankName(
              player?.steamAccount?.seasonRank?.toString()[0]
            );

            return (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {player?.position && (
                      <div className="shrink-0">
                        <Tooltip
                          content={
                            getRoleInfo(player?.role, player?.lane)?.name
                          }
                        >
                          <Image
                            alt=""
                            height={14}
                            radius="none"
                            src={
                              getRoleInfo(player?.role, player?.lane)?.image ||
                              ""
                            }
                            width={14}
                          />
                        </Tooltip>
                      </div>
                    )}
                    <Link
                      as={NextLink}
                      href={`/heroes/${player?.heroId}`}
                    >
                      <Image
                        alt="HeroImage"
                        className="min-w-[70px]"
                        radius="sm"
                        src={
                          IMAGE.url + player?.hero?.shortName + IMAGE.horizontal
                        }
                        width={70}
                      />
                    </Link>
                    <div className="flex flex-col">
                      <Link
                        as={NextLink}
                        color="foreground"
                        href={`/players/${player?.steamAccountId}`}
                        underline="hover"
                      >
                        {player?.steamAccount?.name}
                      </Link>
                      <span className="text-gray-400">
                        {rank} {player?.steamAccount?.seasonRank?.toString()[1]}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-divider">
                    {player?.level}
                  </div>
                </TableCell>
                <TableCell>{player?.kills}</TableCell>
                <TableCell>{player?.deaths}</TableCell>
                <TableCell>{player?.assists}</TableCell>
                <TableCell>
                  {player?.numLastHits} / {player?.numDenies}
                </TableCell>
                <TableCell>{formatNumber(player?.networth!)}</TableCell>
                <TableCell>
                  {player?.goldPerMinute} / {player?.experiencePerMinute}
                </TableCell>
                <TableCell>{formatNumber(player?.heroDamage!)}</TableCell>
                <TableCell>{formatNumber(player?.towerDamage!)}</TableCell>
                <TableCell>{formatNumber(player?.heroHealing!)}</TableCell>
                <TableCell>
                  {renderPlayerItems(player as MatchPlayerType)}
                </TableCell>
                <TableCell>{renderNeutralItem(player?.neutral0Id)}</TableCell>
              </TableRow>
            );
          }) as any
        }

        <TableRow
          className="rounded-full bg-content2"
          key="Overall"
        >
          <TableCell>
            <span className="font-semibold">Total:</span>
          </TableCell>
          <TableCell>{null}</TableCell>
          <TableCell>{totalKills}</TableCell>
          <TableCell>{totalDeaths}</TableCell>
          <TableCell>{totalAssists}</TableCell>
          <TableCell>
            {formatNumber(totalLastHits)} / {totalDenies}
          </TableCell>
          <TableCell>{formatNumber(totalNetWorth)}</TableCell>
          <TableCell>
            {formatNumber(totalGoldPerMin)} / {formatNumber(totalXpPerMin)}
          </TableCell>
          <TableCell>{formatNumber(totalHeroDamage)}</TableCell>
          <TableCell>{formatNumber(totalTowerDamage)}</TableCell>
          <TableCell>{formatNumber(totalHeroHealing)}</TableCell>
          <TableCell>{null}</TableCell>
          <TableCell>{null}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
