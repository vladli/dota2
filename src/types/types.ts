export interface IHero {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  base_attack_time: number;
  attack_point: number;
  move_speed: number;
  turn_rate: number;
  cm_enabled: boolean;
  legs: number;
  day_vision: number;
  night_vision: number;
  hero_id: number;
  turbo_picks: number;
  turbo_wins: number;
  pro_ban: number;
  pro_win: number;
  pro_pick: number;
  "1_pick": number;
  "1_win": number;
  "2_pick": number;
  "2_win": number;
  "3_pick": number;
  "3_win": number;
  "4_pick": number;
  "4_win": number;
  "5_pick": number;
  "5_win": number;
  "6_pick": number;
  "6_win": number;
  "7_pick": number;
  "7_win": number;
  "8_pick": number;
  "8_win": number;
  null_pick: number;
  null_win: number;
}

export interface IHeroAbilities {
  abilities: string[];
  talents: {
    name: string;
    level: number;
  }[];
}

export interface IAbility {
  dname: string;
  behavior: string;
  dmg_type: string;
  bkbpierce: string;
  desc: string;
  attrib: {
    key: string;
    header: string;
    value: string | string[];
    generated?: boolean;
  }[];
  lore: string;
  img: string;
  mc?: string | string[];
  cd?: string | string[];
}
export interface IHeroAbility {
  [key: string]: IAbility;
}
export interface IHeroAghanim {
  hero_name: string;
  hero_id: number;
  has_scepter: boolean;
  scepter_desc?: string;
  scepter_skill_name?: string;
  scepter_new_skill?: boolean;
  has_shard: boolean;
  shard_desc?: string;
  shard_skill_name?: string;
  shard_new_skill?: boolean;
}

export interface IPlayer {
  competitive_rank: number;
  profile: {
    account_id: number;
    personaname: string;
    name: string | null;
    plus: boolean;
    cheese: number;
    steamid: string;
    avatar: string;
    avatarmedium: string;
    avatarfull: string;
    profileurl: string;
    last_login: string;
    loccountrycode: string;
    status: string | null;
    is_contributor: boolean;
    is_subscriber: boolean;
  };
  solo_competitive_rank: number;
  leaderboard_rank: number | null;
  rank_tier: number;
}
export interface IMatch {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number;
  game_mode: number;
  lobby_type: number;
  hero_id: number;
  start_time: number;
  version: number | null;
  kills: number;
  deaths: number;
  assists: number;
  average_rank: number;
  xp_per_min: number;
  gold_per_min: number;
  hero_damage: number;
  tower_damage: number;
  hero_healing: number;
  last_hits: number;
  lane: number | null;
  lane_role: number | null;
  is_roaming: boolean | null;
  cluster: number;
  leaver_status: number;
  party_size: number | null;
}

export interface IPeer {
  account_id: number;
  last_played: number;
  win: number;
  games: number;
  with_win: number;
  with_games: number;
  against_win: number;
  against_games: number;
  with_gpm_sum: number;
  with_xpm_sum: number;
  personaname: string;
  name: string | null;
  is_contributor: boolean;
  is_subscriber: boolean;
  last_login: string;
  avatar: string;
  avatarfull: string;
}
