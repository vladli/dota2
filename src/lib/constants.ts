export const GAME_VERSION = 169;

export const STEAM_IMAGE = "https://cdn.cloudflare.steamstatic.com";
export const STEAM_AVATAR = "https://avatars.steamstatic.com/";
export const STEAM_ABILITY_VIDEO =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/abilities/";
export const IMAGE = {
  url: "https://cdn.stratz.com/images/dota2/heroes/",
  urlAbility: "https://cdn.stratz.com/images/dota2/abilities/",
  urlItem: "https://cdn.stratz.com/images/dota2/items/",
  urlTeam: "https://cdn.stratz.com/images/dota2/teams/",
  urlPlayer: "https://cdn.stratz.com/images/dota2/players/",
  model: "_modelcrop.png",
  horizontal: "_horz.png",
  vertical: "_vert.png",
  icon: "_icon.png",
};

export const HERO_VIDEO =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";

export const HERO_STATS = {
  baseHp: 120,
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
    clientName: "Argentina",
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

export const CONST_TOWERS = [
  {
    id: 16,
    name: "npc_dota_goodguys_tower1_top",
  },
  {
    id: 17,
    name: "npc_dota_goodguys_tower1_mid",
  },
  {
    id: 18,
    name: "npc_dota_goodguys_tower1_bot",
  },
  {
    id: 19,
    name: "npc_dota_goodguys_tower2_top",
  },
  {
    id: 20,
    name: "npc_dota_goodguys_tower2_mid",
  },
  {
    id: 21,
    name: "npc_dota_goodguys_tower2_bot",
  },
  {
    id: 22,
    name: "npc_dota_goodguys_tower3_top",
  },
  {
    id: 23,
    name: "npc_dota_goodguys_tower3_mid",
  },
  {
    id: 24,
    name: "npc_dota_goodguys_tower3_bot",
  },
  {
    id: 25,
    name: "npc_dota_goodguys_tower4",
  },
  {
    id: 26,
    name: "npc_dota_badguys_tower1_top",
  },
  {
    id: 27,
    name: "npc_dota_badguys_tower1_mid",
  },
  {
    id: 28,
    name: "npc_dota_badguys_tower1_bot",
  },
  {
    id: 29,
    name: "npc_dota_badguys_tower2_top",
  },
  {
    id: 30,
    name: "npc_dota_badguys_tower2_mid",
  },
  {
    id: 31,
    name: "npc_dota_badguys_tower2_bot",
  },
  {
    id: 32,
    name: "npc_dota_badguys_tower3_top",
  },
  {
    id: 33,
    name: "npc_dota_badguys_tower3_mid",
  },
  {
    id: 34,
    name: "npc_dota_badguys_tower3_bot",
  },
  {
    id: 35,
    name: "npc_dota_badguys_tower4",
  },
  {
    id: 36,
    name: "npc_dota_goodguys_fillers",
  },
  {
    id: 37,
    name: "npc_dota_badguys_fillers",
  },
  {
    id: 38,
    name: "npc_dota_goodguys_melee_barracks_top",
  },
  {
    id: 39,
    name: "npc_dota_goodguys_melee_barracks_mid",
  },
  {
    id: 40,
    name: "npc_dota_goodguys_melee_barracks_bot",
  },
  {
    id: 41,
    name: "npc_dota_goodguys_range_barracks_top",
  },
  {
    id: 42,
    name: "npc_dota_goodguys_range_barracks_mid",
  },
  {
    id: 43,
    name: "npc_dota_goodguys_range_barracks_bot",
  },
  {
    id: 44,
    name: "npc_dota_badguys_melee_barracks_top",
  },
  {
    id: 45,
    name: "npc_dota_badguys_melee_barracks_mid",
  },
  {
    id: 46,
    name: "npc_dota_badguys_melee_barracks_bot",
  },
  {
    id: 47,
    name: "npc_dota_badguys_range_barracks_top",
  },
  {
    id: 48,
    name: "npc_dota_badguys_range_barracks_mid",
  },
  {
    id: 49,
    name: "npc_dota_badguys_range_barracks_bot",
  },
  {
    id: 50,
    name: "npc_dota_goodguys_ancient",
  },
  {
    id: 51,
    name: "npc_dota_badguys_ancient",
  },
];
