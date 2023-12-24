import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { REGION_NAME, STEAM_AVATAR } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarLink(string: string | undefined | null) {
  if (!string) return;
  if (string.startsWith("https://")) {
    return string;
  }
  const modifiedAvatar = string.replace(/^[a-z0-9]+\//i, "");

  return STEAM_AVATAR + modifiedAvatar; // Concatenate base URL with the relative path
}

export function steamID64ToSteamID3(steamID64: string) {
  const baseID = BigInt("76561197960265728");

  const steamID64BigInt = BigInt(steamID64);

  const result = steamID64BigInt - baseID;

  // Add "U" to the beginning and return the result as a string
  return result.toString();
}

export function getRankName(rank: string): string {
  const rankNames: Record<string, string> = {
    "1": "Herald",
    "2": "Guardian",
    "3": "Crusader",
    "4": "Archon",
    "5": "Legend",
    "6": "Ancient",
    "7": "Divine",
    "8": "Immortal",
  };
  return rankNames[rank];
}

export function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Add leading zeros if needed
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

  if (hours > 0) {
    const formattedHours = hours < 10 ? "0" + hours : hours.toString();
    return formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  }
  return formattedMinutes + ":" + formattedSeconds;
}

export function getRegionName(id: number) {
  return REGION_NAME.find((region) => region.id === id)?.clientName;
}
