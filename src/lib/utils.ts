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

export function getRoleImage(
  role: string | null | undefined,
  lane: string | null | undefined
) {
  if (!role || !lane) return null;
  const rolePositionMap = {
    CORE: {
      SAFE_LANE: "/img/position/POSITION_1.svg",
      MID_LANE: "/img/position/POSITION_2.svg",
      OFF_LANE: "/img/position/POSITION_3.svg",
    },
    LIGHT_SUPPORT: "/img/position/POSITION_4.svg",
    HARD_SUPPORT: "/img/position/POSITION_5.svg",
  };
  if (role === "LIGHT_SUPPORT" || role === "HARD_SUPPORT") {
    return rolePositionMap[role] as string;
  }
  const laneMap = rolePositionMap[role as keyof typeof rolePositionMap];
  if (laneMap && laneMap[lane as keyof typeof laneMap]) {
    return laneMap[lane as keyof typeof laneMap];
  }

  return null;
}

export const formatNumber = (num: number) => {
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
