//@ts-nocheck
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

import { STEAM_IMAGE } from "@/lib/constants";
import { getHeroById, getItemsById, getRankName } from "@/lib/utils";
import { IHero, IItems, IItemsId, IMatchDetails } from "@/types/types";

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
  data: IMatchDetails;
  team: "Dire" | "Radiant";
  heroes: IHero[];
  items: IItems;
  itemsId: IItemsId;
};
export default function TabOverview({
  data,
  team,
  heroes,
  items,
  itemsId,
}: Props) {
  const radiantPlayers = data.players.filter((player) => player.isRadiant);
  const direPlayers = data.players.filter((player) => !player.isRadiant);
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
  return (
    <Table
      aria-label="Overview"
      bottomContent={
        <PickBan
          data={data}
          heroes={heroes}
          radiant={team === "Radiant"}
        />
      }
      classNames={{
        base: "border rounded-xl border-content2",
        wrapper: "bg-transparent shadow-none",
      }}
      shadow="none"
    >
      <TableHeader>
        {TABLE_HEADER.map((header) => (
          <TableColumn key={header}>{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {(team === "Radiant" ? radiantPlayers : direPlayers).map(
          (player, i) => {
            totalKills += player.kills;
            totalDeaths += player.deaths;
            totalAssists += player.assists;
            totalLastHits += player.last_hits;
            totalDenies += player.denies;
            totalNetWorth += player.net_worth;
            totalGoldPerMin += player.gold_per_min;
            totalXpPerMin += player.xp_per_min;
            totalHeroDamage += player.hero_damage;
            totalTowerDamage += player.tower_damage;
            totalHeroHealing += player.hero_healing;
            const hero = getHeroById(heroes, player.hero_id);
            const rank = getRankName(player.rank_tier?.toString()[0]);

            const playerItems: string[] = [];
            for (let i = 0; i < 6; i++) {
              //@ts-ignore
              const itemId = player[`item_${i}`];
              playerItems.push(itemId);
            }
            return (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link href={`/heroes/${player.hero_id}`}>
                      <Image
                        alt="HeroImage"
                        className="min-w-[70px]"
                        radius="sm"
                        src={STEAM_IMAGE + hero?.img}
                        width={70}
                      />
                    </Link>
                    <div className="flex flex-col">
                      {player.account_id ? (
                        <>
                          <Link href={`/players/${player.account_id}`}>
                            {player.personaname}
                          </Link>
                          <span className="text-gray-400">
                            {rank} {player.rank_tier?.toString()[1]}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">Anonymous</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-600">
                    {player.level}
                  </div>
                </TableCell>
                <TableCell>{player.kills}</TableCell>
                <TableCell>{player.deaths}</TableCell>
                <TableCell>{player.assists}</TableCell>
                <TableCell>
                  {player.last_hits} / {player.denies}
                </TableCell>
                <TableCell>{formatNumber(player.net_worth)}</TableCell>
                <TableCell>
                  {player.gold_per_min} / {player.xp_per_min}
                </TableCell>
                <TableCell>{formatNumber(player.hero_damage)}</TableCell>
                <TableCell>{formatNumber(player.tower_damage)}</TableCell>
                <TableCell>{formatNumber(player.hero_healing)}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {playerItems.map((item, i) =>
                      item && getItemsById(itemsId, item) ? (
                        <div key={i}>
                          <Image
                            alt="item"
                            className="min-w-[40px]"
                            radius="none"
                            src={
                              STEAM_IMAGE +
                              items[getItemsById(itemsId, item)].img
                            }
                            width={40}
                          />
                        </div>
                      ) : null
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {player.item_neutral &&
                  getItemsById(itemsId, player.item_neutral) ? (
                    <div className="h-[30px] w-[30px] rounded-full">
                      <Image
                        alt="item"
                        className="h-full w-full object-cover"
                        removeWrapper
                        src={
                          STEAM_IMAGE +
                          items[getItemsById(itemsId, player.item_neutral)].img
                        }
                        width={40}
                      />
                    </div>
                  ) : null}
                </TableCell>
              </TableRow>
            );
          }
        )}

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

const PickBan = ({
  data,
  heroes,
  radiant,
}: {
  data: IMatchDetails;
  heroes: IHero[];
  radiant: boolean;
}) => {
  const radiantPick = data.picks_bans.filter(
    (pick) => pick.is_pick && pick.team === 0
  );
  const direPick = data.picks_bans.filter(
    (pick) => pick.is_pick && pick.team === 1
  );
  const radiantBan = data.picks_bans.filter(
    (pick) => !pick.is_pick && pick.team === 0
  );
  const direBan = data.picks_bans.filter(
    (pick) => !pick.is_pick && pick.team === 1
  );
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-1">
        {(radiant ? radiantPick : direPick).map((hero, i) => (
          <div key={i}>
            <Image
              alt=""
              radius="none"
              src={STEAM_IMAGE + getHeroById(heroes, hero.hero_id).img}
              width={70}
            />
            <span className="flex justify-center bg-content2 text-sm font-medium">
              Pick {hero.order + 1}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {(radiant ? radiantBan : direBan).map((hero, i) => (
          <div
            className="relative"
            key={i}
          >
            <div className="absolute inset-x-[-5px] top-[18px] z-50 rotate-[-28deg] border-t-2 border-red-500" />
            <Image
              alt=""
              className="grayscale"
              radius="none"
              src={STEAM_IMAGE + getHeroById(heroes, hero.hero_id).img}
              width={70}
            />
            <span className="flex justify-center bg-content2 text-sm font-medium">
              Ban {hero.order - 10}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
