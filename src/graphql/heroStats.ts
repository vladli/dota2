import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as Types from "../types/types.generated";
export type GetHeroesStatsQueryVariables = Types.Exact<{
  heroIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.Scalars["Short"]["input"]>>
    | Types.InputMaybe<Types.Scalars["Short"]["input"]>
  >;
  bracketIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.RankBracket>>
    | Types.InputMaybe<Types.RankBracket>
  >;
  positionIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.MatchPlayerPositionType>>
    | Types.InputMaybe<Types.MatchPlayerPositionType>
  >;
  gameModeIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.GameModeEnumType>>
    | Types.InputMaybe<Types.GameModeEnumType>
  >;
  take?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type GetHeroesStatsQuery = {
  __typename?: "DotaQuery";
  heroStats?: {
    __typename?: "HeroStatsQuery";
    winDay?: Array<{
      __typename?: "HeroWinDayType";
      day: any;
      heroId: any;
      winCount: number;
      matchCount: number;
    } | null> | null;
  } | null;
};

export type GetHeroMatchUpsQueryVariables = Types.Exact<{
  heroId: Types.Scalars["Short"]["input"];
  matchLimit: Types.Scalars["Int"]["input"];
  bracketBasicIds?: Types.InputMaybe<
    | Array<Types.InputMaybe<Types.RankBracketBasicEnum>>
    | Types.InputMaybe<Types.RankBracketBasicEnum>
  >;
}>;

export type GetHeroMatchUpsQuery = {
  __typename?: "DotaQuery";
  heroStats?: {
    __typename?: "HeroStatsQuery";
    heroVsHeroMatchup?: {
      __typename?: "HeroMatchupType";
      advantage?: Array<{
        __typename?: "HeroDryadType";
        heroId?: any | null;
        matchCountWith?: any | null;
        matchCountVs?: any | null;
        with?: Array<{
          __typename?: "HeroStatsHeroDryadType";
          heroId2?: any | null;
          matchCount?: any | null;
          winCount?: any | null;
          synergy?: any | null;
        } | null> | null;
        vs?: Array<{
          __typename?: "HeroStatsHeroDryadType";
          heroId2?: any | null;
          matchCount?: any | null;
          winCount?: any | null;
          synergy?: any | null;
        } | null> | null;
      } | null> | null;
    } | null;
  } | null;
};

export const GetHeroesStatsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetHeroesStats" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "heroIds" },
          },
          type: {
            kind: "ListType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Short" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bracketIds" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RankBracket" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "positionIds" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "MatchPlayerPositionType" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "gameModeIds" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "GameModeEnumType" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "heroStats" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "winDay" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "heroIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "heroIds" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "bracketIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "bracketIds" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "positionIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "positionIds" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "gameModeIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "gameModeIds" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "take" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "take" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "day" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "heroId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "winCount" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "matchCount" },
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
} as unknown as DocumentNode<GetHeroesStatsQuery, GetHeroesStatsQueryVariables>;
export const GetHeroMatchUpsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetHeroMatchUps" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "heroId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Short" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "matchLimit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "bracketBasicIds" },
          },
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "RankBracketBasicEnum" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "heroStats" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "heroVsHeroMatchup" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "heroId" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "heroId" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "matchLimit" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "matchLimit" },
                      },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "bracketBasicIds" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "bracketBasicIds" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "advantage" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "heroId" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "matchCountWith" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "matchCountVs" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "with" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "heroId2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "matchCount" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "winCount" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "synergy" },
                                  },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "vs" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "heroId2" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "matchCount" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "winCount" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "synergy" },
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
      },
    },
  ],
} as unknown as DocumentNode<
  GetHeroMatchUpsQuery,
  GetHeroMatchUpsQueryVariables
>;
