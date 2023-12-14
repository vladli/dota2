"use client";
import {
  Image,
  Link,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import NextLink from "next/link";

import { STEAM_IMAGE } from "@/lib/constants";
import { IHero } from "@/types/types";

type HeroStatsProps = {
  pick: number;
  win: number;
  totalPicks: number;
};
const HeroStats = ({ pick, win, totalPicks }: HeroStatsProps) => {
  const winRate = Math.floor((win / pick) * 100);
  const pickRate = Number(((pick / totalPicks) * 100).toFixed(1));
  return (
    <div className="flex justify-evenly gap-1">
      <div className="flex flex-col items-center">
        <span>{pick}</span>
        <span>{pickRate}%</span>
        <Progress
          aria-label="Loading..."
          color={
            pickRate <= 12 ? "danger" : pickRate <= 15 ? "warning" : "success"
          }
          size="sm"
          value={pickRate}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <span>{win}</span>
        <span>{winRate}%</span>
        <Progress
          aria-label="Loading..."
          color={
            winRate <= 45 ? "danger" : winRate <= 50 ? "warning" : "success"
          }
          size="sm"
          value={winRate}
        />
      </div>
    </div>
  );
};

type Props = {
  data: IHero[];
};

function calculateAllHeroesPicks(heroes: IHero[]): number {
  return heroes.reduce((total, hero) => total + getTotalPicks(hero), 0);
}

function calculateRankPicks(heroes: IHero[], rank: number): number {
  //@ts-expect-error
  return heroes.reduce((total, hero) => total + hero[`${rank}_pick`], 0);
}

function getTotalPicks(hero: IHero): number {
  return (
    hero["1_pick"] +
    hero["2_pick"] +
    hero["3_pick"] +
    hero["4_pick"] +
    hero["5_pick"] +
    hero["6_pick"] +
    hero["7_pick"] +
    hero["8_pick"]
  );
}

function getTotalWins(hero: IHero): number {
  return (
    hero["1_win"] +
    hero["2_win"] +
    hero["3_win"] +
    hero["4_win"] +
    hero["5_win"] +
    hero["6_win"] +
    hero["7_win"] +
    hero["8_win"]
  );
}

export default function HeroesTable({ data }: Props) {
  const totalPicks = Math.round(calculateAllHeroesPicks(data) / 10);
  const ranksPicks_1 =
    (calculateRankPicks(data, 1) +
      calculateRankPicks(data, 2) +
      calculateRankPicks(data, 3)) /
    10;
  const ranksPicks_2 = calculateRankPicks(data, 4) / 10;
  const ranksPicks_3 = calculateRankPicks(data, 5) / 10;
  const ranksPicks_4 = calculateRankPicks(data, 6) / 10;
  const ranksPicks_5 =
    (calculateRankPicks(data, 7) + calculateRankPicks(data, 8)) / 10;

  return (
    <>
      <div>{totalPicks} matches</div>
      <Table aria-label="HeroesTable">
        <TableHeader>
          <TableColumn>Hero</TableColumn>
          <TableColumn>
            <div className="flex justify-center">Overall</div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex justify-center gap-1">
              <Image
                alt=""
                src="/img/ranks/1.png"
                width={40}
              />
              <Image
                alt=""
                src="/img/ranks/2.png"
                width={40}
              />
              <Image
                alt=""
                src="/img/ranks/3.png"
                width={40}
              />
            </div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex justify-center">
              <Image
                alt=""
                src="/img/ranks/4.png"
                width={40}
              />
            </div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex justify-center">
              <Image
                alt=""
                src="/img/ranks/5.png"
                width={40}
              />
            </div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex justify-center">
              <Image
                alt=""
                src="/img/ranks/6.png"
                width={40}
              />
            </div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
          <TableColumn>
            <div className="flex justify-center gap-1">
              <Image
                alt=""
                src="/img/ranks/7.png"
                width={40}
              />
              <Image
                alt=""
                src="/img/ranks/8.png"
                width={40}
              />
            </div>
            <div className="flex justify-evenly">
              <span>Pick</span>
              <span>Win</span>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody>
          {data.map((hero) => (
            <TableRow key={hero.id}>
              <TableCell className="flex items-center gap-2">
                <Image
                  alt="Hero"
                  className="min-w-[70px]"
                  radius="sm"
                  src={STEAM_IMAGE + hero.img}
                  width={70}
                />
                <Link
                  as={NextLink}
                  href={`/heroes/${hero.id}`}
                >
                  {hero.localized_name}
                </Link>
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={getTotalPicks(hero)}
                  totalPicks={totalPicks}
                  win={getTotalWins(hero)}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["1_pick"] + hero["2_pick"] + hero["3_pick"]}
                  totalPicks={ranksPicks_1}
                  win={hero["1_win"] + hero["2_win"] + hero["3_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["4_pick"]}
                  totalPicks={ranksPicks_2}
                  win={hero["4_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["5_pick"]}
                  totalPicks={ranksPicks_3}
                  win={hero["5_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["6_pick"]}
                  totalPicks={ranksPicks_4}
                  win={hero["6_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["7_pick"] + hero["8_pick"]}
                  totalPicks={ranksPicks_5}
                  win={hero["7_win"] + hero["8_win"]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
