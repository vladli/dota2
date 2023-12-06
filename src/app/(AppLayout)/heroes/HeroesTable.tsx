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
};
const HeroStats = ({ pick, win }: HeroStatsProps) => {
  const winRate = Math.floor((win / pick) * 100);
  return (
    <div className="flex justify-evenly">
      <span>{pick}</span>
      <div>
        {win}
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
  const totalPicks = data.reduce((total, hero) => total + hero["1_pick"], 0);
  function calculateAllHeroesPicks(heroes: IHero[]): number {
    return heroes.reduce((total, hero) => total + getTotalWins(hero), 0);
  }
  return (
    <>
      <div>{calculateAllHeroesPicks(data)}</div>
      <Table>
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
                  src={STEAM_IMAGE + hero.img}
                  width={100}
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
                  win={getTotalWins(hero)}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["1_pick"] + hero["2_pick"] + hero["3_pick"]}
                  win={hero["1_win"] + hero["2_win"] + hero["3_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["4_pick"]}
                  win={hero["4_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["5_pick"]}
                  win={hero["5_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["6_pick"]}
                  win={hero["6_win"]}
                />
              </TableCell>
              <TableCell>
                <HeroStats
                  pick={hero["7_pick"]}
                  win={hero["7_win"]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
