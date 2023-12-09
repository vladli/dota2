export const STEAM_IMAGE = "https://cdn.cloudflare.steamstatic.com";
export const HERO_VIDEO =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";

export const HERO_STATS = {
  strengthHp: 22, //+22 HP
  agilityArmor: 0.166, //+0.166 Armor
  intelligenceMana: 12, //+12 Mana
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
