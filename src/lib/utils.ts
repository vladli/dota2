import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { GetAllHeroesQuery } from "@/graphql/constants";

import { CONST_TOWERS, REGION_NAME, STEAM_AVATAR } from "./constants";

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

export function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes =
    remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes;

  return formattedHours + ":" + formattedMinutes;
}

export function secondsToTime(seconds: number): string {
  const isNegative = seconds < 0;
  seconds = Math.abs(seconds);

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  // Add leading zeros if needed
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes.toString();
  const formattedSeconds =
    remainingSeconds < 10
      ? "0" + remainingSeconds
      : remainingSeconds.toString();

  let result = "";

  if (hours > 0) {
    const formattedHours = hours < 10 ? "0" + hours : hours.toString();
    result = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
  } else {
    result = formattedMinutes + ":" + formattedSeconds;
  }

  // Add a minus sign at the start if the input was negative
  if (isNegative) {
    result = "-" + result;
  }

  return result;
}

export function getRegionName(id: number) {
  return REGION_NAME.find((region) => region.id === id)?.clientName;
}

export function getRoleInfo(
  role: string | null | undefined,
  lane: string | null | undefined
) {
  if (!role || !lane) return null;
  const rolePositionMap = {
    CORE: {
      SAFE_LANE: {
        image: "/img/position/POSITION_1.svg",
        name: "Safe Lane",
      },
      MID_LANE: {
        image: "/img/position/POSITION_2.svg",
        name: "Mid Lane",
      },
      OFF_LANE: {
        image: "/img/position/POSITION_3.svg",
        name: "Off Lane",
      },
    },
    LIGHT_SUPPORT: {
      image: "/img/position/POSITION_4.svg",
      name: "Soft Support",
    },
    HARD_SUPPORT: {
      image: "/img/position/POSITION_5.svg",
      name: "Hard Support",
    },
  };

  if (role === "LIGHT_SUPPORT" || role === "HARD_SUPPORT") {
    return rolePositionMap[role];
  }
  const laneMap = rolePositionMap[role as keyof typeof rolePositionMap];
  if (laneMap && laneMap[lane as keyof typeof laneMap]) {
    return laneMap[lane as keyof typeof laneMap];
  }
  return null;
}

export function getPositionInfo(position: string | null | undefined) {
  if (!position) return null;
  const rolePositionMap = {
    POSITION_1: {
      image: "/img/position/POSITION_1.svg",
      name: "Safe Lane",
    },
    POSITION_2: {
      image: "/img/position/POSITION_2.svg",
      name: "Mid Lane",
    },
    POSITION_3: {
      image: "/img/position/POSITION_3.svg",
      name: "Off Lane",
    },

    POSITION_4: {
      image: "/img/position/POSITION_4.svg",
      name: "Soft Support",
    },
    POSITION_5: {
      image: "/img/position/POSITION_5.svg",
      name: "Hard Support",
    },
  };

  return rolePositionMap[position as keyof typeof rolePositionMap];
}

export function getHeroTier(level: number | null | undefined) {
  if (!level) return null;
  const tierRanges = [
    {
      min: 11,
      max: 11,
      name: "Silver Tier",
      image: "/img/hero_badge/hero_badge_2.png",
    },
    {
      min: 12,
      max: 17,
      name: "Gold Tier",
      image: "/img/hero_badge/hero_badge_3.png",
    },
    {
      min: 18,
      max: 24,
      name: "Platinum Tier",
      image: "/img/hero_badge/hero_badge_4.png",
    },
    {
      min: 25,
      max: 29,
      name: "Grandmaster Tier",
      image: "/img/hero_badge/hero_badge_5.png",
    },
    {
      min: 30,
      max: 30,
      name: "Grandmaster Tier",
      image: "/img/hero_badge/hero_badge_6.png",
    },
  ];

  const tier = tierRanges.find(
    (range) => level >= range.min && level <= range.max
  );
  if (tier) {
    return { name: tier.name, image: tier.image };
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

export function convertToHumanReadable(id: number) {
  const towers = CONST_TOWERS.find((tower) => tower.id === id);
  // Replace underscores with spaces
  let result = towers?.name.replace(/_/g, " ");

  // Replace 'npc dota' with empty string
  result = result?.replace("npc dota", "");

  // Replace 'goodguys' with 'Radiant'
  result = result?.replace("goodguys", "Radiant");

  // Replace 'badguys' with 'Dire'
  result = result?.replace("badguys", "Dire");

  // Capitalize the first letter of each word
  result = result?.replace(/\b\w/g, (l) => l.toUpperCase());

  return result;
}

export function getHero(heroId: number | string, heroes: GetAllHeroesQuery) {
  return heroes?.constants?.heroes?.find((hero) => hero?.id == heroId);
}
