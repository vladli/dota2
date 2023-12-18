export const STEAM_IMAGE = "https://cdn.cloudflare.steamstatic.com";
export const HERO_VIDEO =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/";

export const HERO_STATS = {
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

export const REGION = {
  "1": "US WEST",
  "2": "US EAST",
  "3": "EUROPE",
  "5": "SINGAPORE",
  "6": "DUBAI",
  "7": "AUSTRALIA",
  "8": "STOCKHOLM",
  "9": "AUSTRIA",
  "10": "BRAZIL",
  "11": "SOUTHAFRICA",
  "12": "PW TELECOM SHANGHAI",
  "13": "PW UNICOM",
  "14": "CHILE",
  "15": "PERU",
  "16": "INDIA",
  "17": "PW TELECOM GUANGDONG",
  "18": "PW TELECOM ZHEJIANG",
  "19": "JAPAN",
  "20": "PW TELECOM WUHAN",
  "25": "PW UNICOM TIANJIN",
  "37": "TAIWAN",
  "38": "ARGENTINA",
};
