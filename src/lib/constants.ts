export const STEAM_IMAGE = "https://cdn.cloudflare.steamstatic.com";
export const STEAM_AVATAR = "https://avatars.steamstatic.com/";
export const IMAGE = {
  url: "https://cdn.stratz.com/images/dota2/heroes/",
  urlAbility: "https://cdn.stratz.com/images/dota2/abilities/",
  urlItem: "https://cdn.stratz.com/images/dota2/items/",
  model: "_modelcrop.png",
  horizontal: "_horz.png",
  vertical: "_vert.png",
  icon: "_icon.png",
};

export const HERO_VIDEO =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";

export const HERO_STATS = {
  baseHp: 200,
  baseMana: 75,

  strengthHp: 22, //+22 HP
  strengthHpRegen: 0.1, //+0.1 HP Regeneration
  agilityArmor: 0.166, //+0.166 Armor
  intelligenceMana: 12, //+12 Mana
  intelligenceManaRegen: 0.05, //+0.05 Mana Regeneration
} as const; // 1 stat = ...

export const HERO_ATTRIBUTE = {
  all: {
    name: "Universal",
    img: "/img/hero_type/hero_universal.png",
  },
  agi: {
    name: "Agility",
    img: "/img/hero_type/hero_agility.png",
  },
  int: {
    name: "Intelligence",
    img: "/img/hero_type/hero_intelligence.png",
  },
  str: {
    name: "Strength",
    img: "/img/hero_type/hero_strength.png",
  },
};

export const UNIT_DAMAGE_TYPE: { [key: number]: string } = {
  0: "None",
  1: "Physical",
  2: "Magical",
  4: "Pure",
};

export const REGION_NAME = [
  {
    id: 0,
    clientName: null,
  },
  {
    id: 1,
    clientName: "US West",
  },
  {
    id: 2,
    clientName: "US East",
  },
  {
    id: 3,
    clientName: "Europe West",
  },
  {
    id: 5,
    clientName: "SE Asia",
  },
  {
    id: 6,
    clientName: "Dubai",
  },
  {
    id: 7,
    clientName: "Australia",
  },
  {
    id: 8,
    clientName: "Russia",
  },
  {
    id: 9,
    clientName: "EU East",
  },
  {
    id: 10,
    clientName: "South America",
  },
  {
    id: 11,
    clientName: "South Africa",
  },
  {
    id: 12,
    clientName: "China",
  },
  {
    id: 13,
    clientName: "China",
  },
  {
    id: 14,
    clientName: "Chile",
  },
  {
    id: 15,
    clientName: "Peru",
  },
  {
    id: 16,
    clientName: "India",
  },
  {
    id: 17,
    clientName: "China",
  },
  {
    id: 18,
    clientName: "China",
  },
  {
    id: 19,
    clientName: "Japan",
  },
  {
    id: 20,
    clientName: "China",
  },
  {
    id: 25,
    clientName: "China",
  },
  {
    id: 37,
    clientName: null,
  },
  {
    id: 38,
    clientName: null,
  },
] as const;

export const gameModes = [
  {
    id: 0,
    name: "None",
  },
  {
    id: 1,
    name: "All Pick",
  },
  {
    id: 2,
    name: "Captain's Mode",
  },
  {
    id: 3,
    name: "Random Draft",
  },
  {
    id: 4,
    name: "Single Draft",
  },
  {
    id: 5,
    name: "All Random",
  },
  {
    id: 6,
    name: "Intro",
  },
  {
    id: 7,
    name: "The Diretide",
  },
  {
    id: 8,
    name: "Reverse Captain's Mode",
  },
  {
    id: 9,
    name: "The Greeviling",
  },
  {
    id: 10,
    name: "Tutorial",
  },
  {
    id: 11,
    name: "Mid Only",
  },
  {
    id: 12,
    name: "Least Played",
  },
  {
    id: 13,
    name: "New Player Pool",
  },
  {
    id: 14,
    name: "Compendium Matchmaking",
  },
  {
    id: 15,
    name: "Custom",
  },
  {
    id: 16,
    name: "Captain's Draft",
  },
  {
    id: 17,
    name: "Balanced Draft",
  },
  {
    id: 18,
    name: "Ability Draft",
  },
  {
    id: 19,
    name: "Event",
  },
  {
    id: 20,
    name: "All Random Deathmatch",
  },
  {
    id: 21,
    name: "Solo Mid",
  },
  {
    id: 22,
    name: "All Pick",
  },
  {
    id: 23,
    name: "Turbo",
  },
  {
    id: 24,
    name: "Mutation",
  },
] as const;
