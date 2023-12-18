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

export interface IFavoriteHeroes {
  hero_id: number;
  last_played: number;
  games: number;
  win: number;
  with_games: number;
  with_win: number;
  against_games: number;
  against_win: number;
}

export interface IMatchDetails {
  match_id: number;
  barracks_status_dire: number;
  barracks_status_radiant: number;
  chat: any;
  cluster: number;
  cosmetics: any;
  dire_score: number;
  dire_team_id: number | null;
  draft_timings: any;
  duration: number;
  engine: number;
  first_blood_time: number;
  game_mode: number;
  human_players: number;
  leagueid: number;
  lobby_type: number;
  match_seq_num: number;
  negative_votes: number | null;
  objectives: any;
  picks_bans: {
    is_pick: boolean;
    hero_id: number;
    team: number;
    order: number;
  }[];
  positive_votes: number | null;
  radiant_gold_adv: any;
  radiant_score: number;
  radiant_team_id: number | null;
  radiant_win: boolean;
  radiant_xp_adv: any;
  skill: any;
  start_time: number;
  teamfights: any;
  tower_status_dire: number;
  tower_status_radiant: number;
  version: number | null;
  od_storage: string;
  patch: number;
  region: number;
  players: IMatchPlayer[];
}

interface IMatchPlayer {
  match_id: number;
  player_slot: number;
  ability_targets: any;
  ability_upgrades_arr: number[];
  ability_uses: any;
  account_id: number;
  actions: any;
  additional_units: any;
  assists: number;
  backpack_0: number;
  backpack_1: number;
  backpack_2: number;
  backpack_3: any;
  buyback_log: any;
  camps_stacked: any;
  connection_log: any;
  creeps_stacked: any;
  damage: any;
  damage_inflictor: any;
  damage_inflictor_received: any;
  damage_taken: any;
  damage_targets: any;
  deaths: number;
  denies: number;
  dn_t: any;
  firstblood_claimed: any;
  gold: number;
  gold_per_min: number;
  gold_reasons: any;
  gold_spent: number;
  gold_t: any;
  hero_damage: number;
  hero_healing: number;
  hero_hits: any;
  hero_id: number;
  item_0: number;
  item_1: number;
  item_2: number;
  item_3: number;
  item_4: number;
  item_5: number;
  item_neutral: number;
  item_uses: any;
  kill_streaks: any;
  killed: any;
  killed_by: any;
  kills: number;
  kills_log: any;
  lane_pos: any;
  last_hits: number;
  leaver_status: number;
  level: number;
  lh_t: any;
  life_state: any;
  max_hero_hit: any;
  multi_kills: any;
  net_worth: number;
  obs: any;
  obs_left_log: any;
  obs_log: any;
  obs_placed: any;
  party_id: any;
  party_size: any;
  performance_others: any;
  permanent_buffs: any;
  pings: any;
  pred_vict: any;
  purchase: any;
  purchase_log: any;
  randomed: any;
  repicked: any;
  roshans_killed: any;
  rune_pickups: any;
  runes: any;
  runes_log: any;
  sen: any;
  sen_left_log: any;
  sen_log: any;
  sen_placed: any;
  stuns: any;
  teamfight_participation: any;
  times: any;
  tower_damage: number;
  towers_killed: any;
  xp_per_min: number;
  xp_reasons: any;
  xp_t: any;
  personaname: string;
  name: any;
  last_login: string;
  radiant_win: boolean;
  start_time: number;
  duration: number;
  cluster: number;
  lobby_type: number;
  game_mode: number;
  is_contributor: boolean;
  patch: number;
  region: number;
  isRadiant: boolean;
  win: number;
  lose: number;
  total_gold: number;
  total_xp: number;
  kills_per_min: number;
  kda: number;
  abandons: number;
  rank_tier: number;
  is_subscriber: boolean;
  cosmetics: any[];
  benchmarks: {
    gold_per_min: {
      raw: number;
      pct: number;
    };
    xp_per_min: {
      raw: number;
      pct: number;
    };
    kills_per_min: {
      raw: number;
      pct: number;
    };
    last_hits_per_min: {
      raw: number;
      pct: number;
    };
    hero_damage_per_min: {
      raw: number;
      pct: number;
    };
    hero_healing_per_min: {
      raw: number;
      pct: number;
    };
    tower_damage: {
      raw: number;
      pct: number;
    };
  };
}

export interface IItemsId {
  [key: string]: string;
}

export interface IItems {
  [key: string]: {
    hint: string[];
    id: number;
    img: string;
    dname: string;
    qual: string;
    cost: number;
    notes: string;
    attrib: any[];
    mc: boolean;
    cd: number;
    lore: string;
    components: null | string[];
    created: boolean;
    charges: boolean;
  };
}
