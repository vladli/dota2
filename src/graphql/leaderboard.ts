import * as Types from '../types/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetLeaderBoardsQueryVariables = Types.Exact<{
  leaderboardRequestVariable?: Types.InputMaybe<Types.FilterSeasonLeaderboardRequestType>;
  skip?: Types.InputMaybe<Types.Scalars['Long']['input']>;
  take?: Types.InputMaybe<Types.Scalars['Long']['input']>;
}>;


export type GetLeaderBoardsQuery = { __typename?: 'DotaQuery', leaderboard?: { __typename?: 'LeaderboardQuery', season?: { __typename?: 'SteamAccountSeasonActiveLeaderboardType', playerCount?: number | null, players?: Array<{ __typename?: 'SteamAccountSeasonActiveLeaderboardRankType', steamAccountId?: any | null, position?: Types.MatchPlayerPositionType | null, positionValue?: any | null, rank?: any | null, rankShift?: any | null, steamAccount?: { __typename?: 'SteamAccountType', name?: string | null, proSteamAccount?: { __typename?: 'ProSteamAccountType', name?: string | null, team?: { __typename?: 'TeamType', id: number, tag?: string | null, name?: string | null } | null } | null } | null } | null> | null } | null } | null };


export const GetLeaderBoardsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetLeaderBoards"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"leaderboardRequestVariable"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"FilterSeasonLeaderboardRequestType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"take"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leaderboard"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"request"},"value":{"kind":"Variable","name":{"kind":"Name","value":"leaderboardRequestVariable"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerCount"}},{"kind":"Field","name":{"kind":"Name","value":"players"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"Variable","name":{"kind":"Name","value":"take"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"steamAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"positionValue"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"rankShift"}},{"kind":"Field","name":{"kind":"Name","value":"steamAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"proSteamAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetLeaderBoardsQuery, GetLeaderBoardsQueryVariables>;