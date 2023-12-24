import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as Types from "../types/types.generated";
export type GetPlayerBySteamIdQueryVariables = Types.Exact<{
  steamAccountId: Types.Scalars["Long"]["input"];
}>;

export type GetPlayerBySteamIdQuery = {
  __typename?: "DotaQuery";
  player?: {
    __typename?: "PlayerType";
    steamAccountId?: any | null;
    matchCount?: number | null;
    winCount?: number | null;
    steamAccount?: {
      __typename?: "SteamAccountType";
      profileUri?: string | null;
      timeCreated?: any | null;
      name?: string | null;
      avatar?: string | null;
      isDotaPlusSubscriber?: boolean | null;
      seasonRank?: any | null;
    } | null;
  } | null;
};

export type GetRecentMatchesQueryVariables = Types.Exact<{
  steamAccountId: Types.Scalars["Long"]["input"];
  take: Types.Scalars["Int"]["input"];
}>;

export type GetRecentMatchesQuery = {
  __typename?: "DotaQuery";
  player?: {
    __typename?: "PlayerType";
    matches?: Array<{
      __typename?: "MatchType";
      id?: any | null;
      didRadiantWin?: boolean | null;
      durationSeconds?: number | null;
      endDateTime?: any | null;
      towerStatusRadiant?: number | null;
      towerStatusDire?: number | null;
      barracksStatusRadiant?: any | null;
      barracksStatusDire?: any | null;
      lobbyType?: Types.LobbyTypeEnum | null;
      gameMode?: Types.GameModeEnumType | null;
      actualRank?: any | null;
      players?: Array<{
        __typename?: "MatchPlayerType";
        isVictory?: boolean | null;
        kills?: any | null;
        deaths?: any | null;
        assists?: any | null;
        lane?: Types.MatchLaneType | null;
        role?: Types.MatchPlayerRoleType | null;
        hero?: {
          __typename?: "HeroType";
          id?: any | null;
          shortName?: string | null;
          displayName?: string | null;
        } | null;
      } | null> | null;
    } | null> | null;
  } | null;
};

export type GetMostPlayedHeroesQueryVariables = Types.Exact<{
  steamAccountId: Types.Scalars["Long"]["input"];
  take: Types.Scalars["Int"]["input"];
  gameVersionId: Types.Scalars["Short"]["input"];
}>;

export type GetMostPlayedHeroesQuery = {
  __typename?: "DotaQuery";
  player?: {
    __typename?: "PlayerType";
    steamAccountId?: any | null;
    matchCount?: number | null;
    heroesGroupBy?: Array<
      | { __typename?: "MatchGroupByAssistsType" }
      | { __typename?: "MatchGroupByAwardType" }
      | { __typename?: "MatchGroupByClusterType" }
      | { __typename?: "MatchGroupByDateDayHeroType" }
      | { __typename?: "MatchGroupByDateDayType" }
      | { __typename?: "MatchGroupByDeathsType" }
      | { __typename?: "MatchGroupByDurationMinutesType" }
      | { __typename?: "MatchGroupByFactionType" }
      | { __typename?: "MatchGroupByGameModeType" }
      | { __typename?: "MatchGroupByGameVersionType" }
      | { __typename?: "MatchGroupByGoldPerMinuteType" }
      | { __typename?: "MatchGroupByHeroPerformanceType" }
      | {
          __typename?: "MatchGroupByHeroType";
          heroId?: any | null;
          winCount?: number | null;
          matchCount?: number | null;
          avgKills?: number | null;
          avgDeaths?: number | null;
          avgAssists?: number | null;
          lastMatchDateTime?: any | null;
          hero?: {
            __typename?: "HeroType";
            displayName?: string | null;
            shortName?: string | null;
          } | null;
        }
      | { __typename?: "MatchGroupByHourType" }
      | { __typename?: "MatchGroupByIsIntentionalFeedingType" }
      | { __typename?: "MatchGroupByIsLeagueType" }
      | { __typename?: "MatchGroupByIsLeaverType" }
      | { __typename?: "MatchGroupByIsPartyType" }
      | { __typename?: "MatchGroupByIsRandomType" }
      | { __typename?: "MatchGroupByIsSeriesType" }
      | { __typename?: "MatchGroupByIsStatsType" }
      | { __typename?: "MatchGroupByIsVictoryType" }
      | { __typename?: "MatchGroupByKillsType" }
      | { __typename?: "MatchGroupByLaneType" }
      | { __typename?: "MatchGroupByLeagueIdType" }
      | { __typename?: "MatchGroupByLevelType" }
      | { __typename?: "MatchGroupByLobbyTypeType" }
      | { __typename?: "MatchGroupByPositionType" }
      | { __typename?: "MatchGroupByRegionType" }
      | { __typename?: "MatchGroupByRoamLaneType" }
      | { __typename?: "MatchGroupByRoleType" }
      | { __typename?: "MatchGroupBySteamAccountIdAgainstTeamType" }
      | { __typename?: "MatchGroupBySteamAccountIdHeroIdAgainstTeamType" }
      | { __typename?: "MatchGroupBySteamAccountIdHeroIdType" }
      | { __typename?: "MatchGroupBySteamAccountIdHeroIdWithTeamType" }
      | { __typename?: "MatchGroupBySteamAccountIdType" }
      | { __typename?: "MatchGroupBySteamAccountIdWithTeamType" }
      | { __typename?: "MatchGroupByTeamType" }
      | { __typename?: "MatchGroupByTotalKillsType" }
      | null
    > | null;
  } | null;
};

export const GetPlayerBySteamIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlayerBySteamId" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "steamAccountId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "player" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "steamAccountId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "steamAccountId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "steamAccountId" },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "steamAccount" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "profileUri" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "timeCreated" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "avatar" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isDotaPlusSubscriber" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "seasonRank" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "matchCount" } },
                { kind: "Field", name: { kind: "Name", value: "winCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetPlayerBySteamIdQuery,
  GetPlayerBySteamIdQueryVariables
>;
export const GetRecentMatchesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetRecentMatches" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "steamAccountId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "player" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "steamAccountId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "steamAccountId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "matches" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "request" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "take" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "take" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "didRadiantWin" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "durationSeconds" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "endDateTime" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "towerStatusRadiant" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "towerStatusDire" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "barracksStatusRadiant" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "barracksStatusDire" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "lobbyType" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "gameMode" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "actualRank" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "players" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "steamAccountId" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "steamAccountId" },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hero" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "shortName" },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "displayName",
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "isVictory" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "kills" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "deaths" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "assists" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "lane" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "role" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetRecentMatchesQuery,
  GetRecentMatchesQueryVariables
>;
export const GetMostPlayedHeroesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetMostPlayedHeroes" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "steamAccountId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "gameVersionId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Short" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "player" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "steamAccountId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "steamAccountId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "steamAccountId" },
                },
                { kind: "Field", name: { kind: "Name", value: "matchCount" } },
                {
                  kind: "Field",
                  alias: { kind: "Name", value: "heroesGroupBy" },
                  name: { kind: "Name", value: "matchesGroupBy" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "request" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "playerList" },
                            value: { kind: "EnumValue", value: "SINGLE" },
                          },
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "groupBy" },
                            value: { kind: "EnumValue", value: "HERO" },
                          },
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "take" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "take" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "MatchGroupByHeroType" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "heroId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "hero" },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: {
                                    kind: "Name",
                                    value: "gameVersionId",
                                  },
                                  value: {
                                    kind: "Variable",
                                    name: {
                                      kind: "Name",
                                      value: "gameVersionId",
                                    },
                                  },
                                },
                              ],
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "displayName",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "shortName" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "winCount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "matchCount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avgKills" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avgDeaths" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avgAssists" },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "lastMatchDateTime",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetMostPlayedHeroesQuery,
  GetMostPlayedHeroesQueryVariables
>;
