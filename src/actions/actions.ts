"use server";

import { IHero } from "@/types/types";

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
