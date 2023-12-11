import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { IHero } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHeroName(link: string) {
  const parts = link.split("/");
  return parts[parts.length - 1].split(".")[0];
}

export function getHeroPrimaryAttribute(hero: IHero) {
  if (hero.primary_attr === "all") return hero.base_agi;
  if (hero.primary_attr === "agi") return hero.base_agi;
  if (hero.primary_attr === "int") return hero.base_int;
  if (hero.primary_attr === "str") return hero.base_str;
  return 0;
}
