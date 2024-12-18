import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

import * as Types from "../types/types.generated";
export type GetPlayerPeersQueryVariables = Types.Exact<{
  steamId: Types.Scalars["Long"]["input"];
  teammatesPeersRequest: Types.PlayerTeammatesGroupByRequestType;
  take?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
  skip?: Types.InputMaybe<Types.Scalars["Int"]["input"]>;
}>;

export type GetPlayerPeersQuery = {
  __typename?: "DotaQuery";
  stratz?: {
    __typename?: "StratzQuery";
    page?: {
      __typename?: "PageQuery";
      player?: {
        __typename?: "PagePlayerQuery";
        peers?: Array<{
          __typename?: "PlayerTeammateType";
          steamAccountId?: any | null;
          matchCount?: number | null;
          winCount?: number | null;
          lastMatchDateTime?: any | null;
          steamAccount?: {
            __typename?: "SteamAccountType";
            id?: any | null;
            name?: string | null;
            avatar?: string | null;
            isDotaPlusSubscriber?: boolean | null;
            isAnonymous: boolean;
            isStratzPublic: boolean;
            proSteamAccount?: {
              __typename?: "ProSteamAccountType";
              id?: any | null;
              name?: string | null;
              realName?: string | null;
              isLocked: boolean;
              isPro: boolean;
              totalEarnings: number;
              team?: {
                __typename?: "TeamType";
                id: number;
                name?: string | null;
                tag?: string | null;
              } | null;
            } | null;
          } | null;
        } | null> | null;
      } | null;
    } | null;
  } | null;
};

export type GetSearchQueryVariables = Types.Exact<{
  request: Types.FilterSearchRequestType;
}>;

export type GetSearchQuery = {
  __typename?: "DotaQuery";
  stratz?: {
    __typename?: "StratzQuery";
    search?: {
      __typename?: "SearchType";
      players?: Array<{
        __typename?: "SteamAccountType";
        id?: any | null;
        avatar?: string | null;
        name?: string | null;
      } | null> | null;
      matches?: Array<{
        __typename?: "MatchType";
        id?: any | null;
      } | null> | null;
      proPlayers?: Array<{
        __typename?: "SteamAccountType";
        id?: any | null;
        avatar?: string | null;
        name?: string | null;
        proSteamAccount?: {
          __typename?: "ProSteamAccountType";
          id?: any | null;
          name?: string | null;
          team?: {
            __typename?: "TeamType";
            id: number;
            name?: string | null;
            tag?: string | null;
          } | null;
        } | null;
      } | null> | null;
      teams?: Array<{
        __typename?: "TeamType";
        id: number;
        name?: string | null;
        tag?: string | null;
      } | null> | null;
    } | null;
  } | null;
};

export const GetPlayerPeersDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetPlayerPeers" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "steamId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Long" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "teammatesPeersRequest" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "PlayerTeammatesGroupByRequestType",
              },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "take" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "skip" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stratz" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "page" },
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
                              name: { kind: "Name", value: "steamId" },
                            },
                          },
                        ],
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "peers" },
                              arguments: [
                                {
                                  kind: "Argument",
                                  name: { kind: "Name", value: "request" },
                                  value: {
                                    kind: "Variable",
                                    name: {
                                      kind: "Name",
                                      value: "teammatesPeersRequest",
                                    },
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
                                {
                                  kind: "Argument",
                                  name: { kind: "Name", value: "skip" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "skip" },
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
                                      value: "steamAccountId",
                                    },
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
                                    name: {
                                      kind: "Name",
                                      value: "lastMatchDateTime",
                                    },
                                  },
                                  {
                                    kind: "Field",
                                    name: {
                                      kind: "Name",
                                      value: "steamAccount",
                                    },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "avatar",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isDotaPlusSubscriber",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isAnonymous",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "isStratzPublic",
                                          },
                                        },
                                        {
                                          kind: "Field",
                                          name: {
                                            kind: "Name",
                                            value: "proSteamAccount",
                                          },
                                          selectionSet: {
                                            kind: "SelectionSet",
                                            selections: [
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "id",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "name",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "realName",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "isLocked",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "isPro",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "totalEarnings",
                                                },
                                              },
                                              {
                                                kind: "Field",
                                                name: {
                                                  kind: "Name",
                                                  value: "team",
                                                },
                                                selectionSet: {
                                                  kind: "SelectionSet",
                                                  selections: [
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "id",
                                                      },
                                                    },
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "name",
                                                      },
                                                    },
                                                    {
                                                      kind: "Field",
                                                      name: {
                                                        kind: "Name",
                                                        value: "tag",
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
} as unknown as DocumentNode<GetPlayerPeersQuery, GetPlayerPeersQueryVariables>;
export const GetSearchDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetSearch" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "request" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FilterSearchRequestType" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "stratz" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "search" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "request" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "request" },
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "players" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "matches" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "proPlayers" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "avatar" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "proSteamAccount" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "id" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "name" },
                                  },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "team" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "id" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "name" },
                                        },
                                        {
                                          kind: "Field",
                                          name: { kind: "Name", value: "tag" },
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
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "teams" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "tag" },
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
} as unknown as DocumentNode<GetSearchQuery, GetSearchQueryVariables>;
