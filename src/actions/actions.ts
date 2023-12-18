"use server";

import {
  IFavoriteHeroes,
  IHero,
  IHeroAbilities,
  IHeroAbility,
  IHeroAghanim,
  IItems,
  IItemsId,
  IMatch,
  IMatchDetails,
  IPeer,
  IPlayer,
} from "@/types/types";

export async function fetchData(
  url: string,
  opt?: RequestInit
): Promise<any | undefined> {
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch("https://api.opendota.com/api" + url, {
      ...options,
      ...opt,
    });
    if (response.status === 200) {
      return response.json();
    }
    console.error("Fetch error.");
    return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getHeroStats(): Promise<IHero[]> {
  const url = `/heroStats`;
  const data = fetchData(url);
  return data.then((res) =>
    res.sort((a: IHero, b: IHero) =>
      a.localized_name.localeCompare(b.localized_name)
    )
  );
}

export async function getHero(id: number): Promise<IHero> {
  const url = `/heroStats`;
  const data = fetchData(url);
  return data.then((res) => res.find((hero: IHero) => hero.id === id));
}

export async function getHeroAbilities(hero: string): Promise<IHeroAbilities> {
  const url = `/constants/hero_abilities`;
  const data = await fetchData(url);
  return data[hero];
}

export async function getAbilities(): Promise<IHeroAbility> {
  const url = `/constants/abilities`;
  const data = await fetchData(url);
  return data;
}

export async function getAganimDescription(
  heroName: string
): Promise<IHeroAghanim> {
  const url = `/constants/aghs_desc`;
  const data = fetchData(url);
  return data.then((res) =>
    res.find((hero: IHeroAghanim) => hero.hero_name === heroName)
  );
}

export async function getItemsId(): Promise<IItemsId> {
  const url = `/constants/item_ids`;
  const data = await fetchData(url);
  return data;
}

export async function getItems(): Promise<IItems> {
  const url = `/constants/items`;
  const data = await fetchData(url);
  return data;
}

export async function getPlayer(steamId: string): Promise<IPlayer> {
  const url = `/players/${steamId}`;
  const data = await fetchData(url);
  return data;
}

export async function getPlayerWinRate(
  steamId: string
): Promise<{ win: number; lose: number }> {
  const url = `/players/${steamId}/wl`;
  const data = await fetchData(url);
  return data;
}

export async function getPlayerRecentMatches(
  steamId: string
): Promise<IMatch[]> {
  const url = `/players/${steamId}/recentMatches`;
  const data = await fetchData(url);
  return data;
}

export async function getPlayerPlayedWith(steamId: string): Promise<IPeer[]> {
  const url = `/players/${steamId}/peers`;
  const data = await fetchData(url);
  return data;
}

export async function getPlayerFavoriteHeroes(
  steamId: string
): Promise<IFavoriteHeroes[]> {
  const url = `/players/${steamId}/heroes`;
  const data = await fetchData(url);
  return data;
}

export async function getMatch(matchId: string): Promise<IMatchDetails> {
  const url = `/matches/${matchId}`;
  const data = await fetchData(url);
  return data;
}
