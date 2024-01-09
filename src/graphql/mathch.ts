import * as Types from '../types/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetMatchByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Long']['input'];
}>;


export type GetMatchByIdQuery = { __typename?: 'DotaQuery', match?: { __typename?: 'MatchType', id?: any | null, didRadiantWin?: boolean | null, durationSeconds?: number | null, startDateTime?: any | null, endDateTime?: any | null, towerStatusRadiant?: number | null, towerStatusDire?: number | null, barracksStatusRadiant?: any | null, barracksStatusDire?: any | null, lobbyType?: Types.LobbyTypeEnum | null, gameMode?: Types.GameModeEnumType | null, isStats?: boolean | null, gameVersionId?: any | null, regionId?: any | null, parsedDateTime?: any | null, rank?: number | null, bracket?: any | null, bottomLaneOutcome?: Types.LaneOutcomeEnums | null, midLaneOutcome?: Types.LaneOutcomeEnums | null, topLaneOutcome?: Types.LaneOutcomeEnums | null, radiantKills?: Array<number | null> | null, direKills?: Array<number | null> | null, radiantNetworthLeads?: Array<number | null> | null, radiantExperienceLeads?: Array<number | null> | null, pickBans?: Array<{ __typename?: 'MatchStatsPickBanType', isPick: boolean, heroId?: any | null, bannedHeroId?: any | null, isRadiant?: boolean | null, playerIndex?: number | null, wasBannedSuccessfully?: boolean | null } | null> | null, players?: Array<{ __typename?: 'MatchPlayerType', matchId?: any | null, playerSlot?: any | null, steamAccountId?: any | null, isRadiant?: boolean | null, isVictory?: boolean | null, heroId?: any | null, gameVersionId?: any | null, kills?: any | null, deaths?: any | null, assists?: any | null, leaverStatus?: Types.LeaverStatusEnum | null, numLastHits?: any | null, numDenies?: any | null, goldPerMinute?: any | null, networth?: number | null, experiencePerMinute?: any | null, level?: any | null, gold?: number | null, goldSpent?: number | null, heroDamage?: number | null, towerDamage?: number | null, heroHealing?: number | null, partyId?: any | null, isRandom?: boolean | null, lane?: Types.MatchLaneType | null, position?: Types.MatchPlayerPositionType | null, streakPrediction?: any | null, intentionalFeeding?: boolean | null, role?: Types.MatchPlayerRoleType | null, roleBasic?: Types.MatchPlayerRoleType | null, item0Id?: any | null, item1Id?: any | null, item2Id?: any | null, item3Id?: any | null, item4Id?: any | null, item5Id?: any | null, backpack0Id?: any | null, backpack1Id?: any | null, backpack2Id?: any | null, neutral0Id?: any | null, behavior?: any | null, invisibleSeconds?: number | null, dotaPlusHeroXp?: number | null, steamAccount?: { __typename?: 'SteamAccountType', name?: string | null, seasonRank?: any | null } | null, hero?: { __typename?: 'HeroType', shortName?: string | null, displayName?: string | null } | null, stats?: { __typename?: 'MatchPlayerStatsType', itemPurchases?: Array<{ __typename?: 'MatchPlayerItemPurchaseEventType', time: number, itemId: number } | null> | null, killEvents?: Array<{ __typename?: 'MatchPlayerStatsKillEventType', time: number, target?: number | null } | null> | null } | null } | null> | null } | null };


export const GetMatchByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMatchById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Long"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"match"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"didRadiantWin"}},{"kind":"Field","name":{"kind":"Name","value":"durationSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"startDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"endDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"towerStatusRadiant"}},{"kind":"Field","name":{"kind":"Name","value":"towerStatusDire"}},{"kind":"Field","name":{"kind":"Name","value":"barracksStatusRadiant"}},{"kind":"Field","name":{"kind":"Name","value":"barracksStatusDire"}},{"kind":"Field","name":{"kind":"Name","value":"lobbyType"}},{"kind":"Field","name":{"kind":"Name","value":"gameMode"}},{"kind":"Field","name":{"kind":"Name","value":"isStats"}},{"kind":"Field","name":{"kind":"Name","value":"gameVersionId"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"parsedDateTime"}},{"kind":"Field","name":{"kind":"Name","value":"rank"}},{"kind":"Field","name":{"kind":"Name","value":"bracket"}},{"kind":"Field","name":{"kind":"Name","value":"bottomLaneOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"midLaneOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"topLaneOutcome"}},{"kind":"Field","name":{"kind":"Name","value":"radiantKills"}},{"kind":"Field","name":{"kind":"Name","value":"direKills"}},{"kind":"Field","name":{"kind":"Name","value":"radiantNetworthLeads"}},{"kind":"Field","name":{"kind":"Name","value":"radiantExperienceLeads"}},{"kind":"Field","name":{"kind":"Name","value":"pickBans"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isPick"}},{"kind":"Field","name":{"kind":"Name","value":"heroId"}},{"kind":"Field","name":{"kind":"Name","value":"bannedHeroId"}},{"kind":"Field","name":{"kind":"Name","value":"isRadiant"}},{"kind":"Field","name":{"kind":"Name","value":"playerIndex"}},{"kind":"Field","name":{"kind":"Name","value":"wasBannedSuccessfully"}}]}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"matchId"}},{"kind":"Field","name":{"kind":"Name","value":"playerSlot"}},{"kind":"Field","name":{"kind":"Name","value":"steamAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"steamAccount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"seasonRank"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isRadiant"}},{"kind":"Field","name":{"kind":"Name","value":"isVictory"}},{"kind":"Field","name":{"kind":"Name","value":"heroId"}},{"kind":"Field","name":{"kind":"Name","value":"hero"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemPurchases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"itemId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"killEvents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"time"}},{"kind":"Field","name":{"kind":"Name","value":"target"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"gameVersionId"}},{"kind":"Field","name":{"kind":"Name","value":"kills"}},{"kind":"Field","name":{"kind":"Name","value":"deaths"}},{"kind":"Field","name":{"kind":"Name","value":"assists"}},{"kind":"Field","name":{"kind":"Name","value":"leaverStatus"}},{"kind":"Field","name":{"kind":"Name","value":"numLastHits"}},{"kind":"Field","name":{"kind":"Name","value":"numDenies"}},{"kind":"Field","name":{"kind":"Name","value":"goldPerMinute"}},{"kind":"Field","name":{"kind":"Name","value":"networth"}},{"kind":"Field","name":{"kind":"Name","value":"experiencePerMinute"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"gold"}},{"kind":"Field","name":{"kind":"Name","value":"goldSpent"}},{"kind":"Field","name":{"kind":"Name","value":"heroDamage"}},{"kind":"Field","name":{"kind":"Name","value":"towerDamage"}},{"kind":"Field","name":{"kind":"Name","value":"heroHealing"}},{"kind":"Field","name":{"kind":"Name","value":"partyId"}},{"kind":"Field","name":{"kind":"Name","value":"isRandom"}},{"kind":"Field","name":{"kind":"Name","value":"lane"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"streakPrediction"}},{"kind":"Field","name":{"kind":"Name","value":"intentionalFeeding"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"roleBasic"}},{"kind":"Field","name":{"kind":"Name","value":"item0Id"}},{"kind":"Field","name":{"kind":"Name","value":"item1Id"}},{"kind":"Field","name":{"kind":"Name","value":"item2Id"}},{"kind":"Field","name":{"kind":"Name","value":"item3Id"}},{"kind":"Field","name":{"kind":"Name","value":"item4Id"}},{"kind":"Field","name":{"kind":"Name","value":"item5Id"}},{"kind":"Field","name":{"kind":"Name","value":"backpack0Id"}},{"kind":"Field","name":{"kind":"Name","value":"backpack1Id"}},{"kind":"Field","name":{"kind":"Name","value":"backpack2Id"}},{"kind":"Field","name":{"kind":"Name","value":"neutral0Id"}},{"kind":"Field","name":{"kind":"Name","value":"behavior"}},{"kind":"Field","name":{"kind":"Name","value":"invisibleSeconds"}},{"kind":"Field","name":{"kind":"Name","value":"dotaPlusHeroXp"}}]}}]}}]}}]} as unknown as DocumentNode<GetMatchByIdQuery, GetMatchByIdQueryVariables>;