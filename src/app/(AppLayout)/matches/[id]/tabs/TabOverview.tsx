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
  return (
    <Table
      aria-label="Overview"
      classNames={{
        base: "border rounded-xl border-content2",
        wrapper: "bg-transparent shadow-none",
      }}
    >
      <TableHeader>
        {TABLE_HEADER.map((header) => (
          <TableColumn key={header}>{header}</TableColumn>
        ))}
      </TableHeader>

      <TableBody items={team === "Radiant" ? radiantPlayers : direPlayers}>
        {(player) => {
          const hero = getHeroById(heroes, player.hero_id);
          const rank = getRankName(player.rank_tier?.toString()[0]);
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

          const playerItems: string[] = [];
          for (let i = 0; i < 6; i++) {
            //@ts-ignore
            const itemId = player[`item_${i}`];
            playerItems.push(itemId);
          }
          return (
            <TableRow key={player.hero_id}>
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
              <TableCell>{player.level}</TableCell>
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
                  {playerItems.map((item) =>
                    item && getItemsById(itemsId, item) ? (
                      <div key={item}>
                        <Image
                          alt="item"
                          className="min-w-[40px]"
                          radius="none"
                          src={
                            STEAM_IMAGE + items[getItemsById(itemsId, item)].img
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
        }}
      </TableBody>
    </Table>
  );
}
