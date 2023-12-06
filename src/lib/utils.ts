import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getHeroName(link: string) {
  const parts = link.split("/");
  return parts[parts.length - 1].split(".")[0];
}
