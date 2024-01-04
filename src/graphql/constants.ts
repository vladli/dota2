import * as Types from '../types/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GetHeroByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Short']['input'];
}>;


export type GetHeroByIdQuery = { __typename?: 'DotaQuery', constants?: { __typename?: 'ConstantQuery', hero?: { __typename?: 'HeroType', id?: any | null, name?: string | null, shortName?: string | null, displayName?: string | null, roles?: Array<{ __typename?: 'HeroRoleType', roleId?: Types.HeroRoleEnum | null, level?: any | null } | null> | null, abilities?: Array<{ __typename?: 'HeroAbilityType', slot: any, ability?: { __typename?: 'AbilityType', id?: any | null, name?: string | null, isTalent?: boolean | null, language?: { __typename?: 'AbilityLanguageType', displayName?: string | null, description?: Array<string | null> | null, attributes?: Array<string | null> | null, lore?: string | null, aghanimDescription?: string | null, shardDescription?: string | null } | null, stat?: { __typename?: 'AbilityStatType', unitDamageType?: number | null, spellImmunity?: number | null, isGrantedByScepter?: boolean | null, hasScepterUpgrade?: boolean | null, castRange?: Array<number | null> | null, castPoint?: Array<number | null> | null, channelTime?: Array<number | null> | null, cooldown?: Array<number | null> | null, damage?: Array<number | null> | null, manaCost?: Array<number | null> | null, duration?: string | null, charges?: string | null, hasShardUpgrade?: boolean | null, isGrantedByShard?: boolean | null, dispellable?: Types.AbilityDispellEnum | null } | null } | null } | null> | null, language?: { __typename?: 'HeroLanguageType', lore?: string | null } | null, talents?: Array<{ __typename?: 'HeroTalentType', abilityId?: any | null, slot?: any | null } | null> | null, stats?: { __typename?: 'HeroStatType', enabled?: boolean | null, attackType?: string | null, startingArmor?: number | null, startingMagicArmor?: number | null, startingDamageMin?: number | null, startingDamageMax?: number | null, attackRate?: number | null, attackRange?: number | null, primaryAttribute?: string | null, strengthBase?: number | null, strengthGain?: number | null, intelligenceBase?: number | null, intelligenceGain?: number | null, agilityBase?: number | null, agilityGain?: number | null, hpRegen?: number | null, mpRegen?: number | null, moveSpeed?: number | null, moveTurnRate?: number | null, hpBarOffset?: number | null, visionDaytimeRange?: number | null, visionNighttimeRange?: number | null, complexity?: any | null } | null } | null } | null };

export type GetAbilitiesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAbilitiesQuery = { __typename?: 'DotaQuery', constants?: { __typename?: 'ConstantQuery', abilities?: Array<{ __typename?: 'AbilityType', id?: any | null, language?: { __typename?: 'AbilityLanguageType', displayName?: string | null } | null } | null> | null } | null };

export type GetAllHeroesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllHeroesQuery = { __typename?: 'DotaQuery', constants?: { __typename?: 'ConstantQuery', heroes?: Array<{ __typename?: 'HeroType', id?: any | null, name?: string | null, displayName?: string | null, shortName?: string | null } | null> | null } | null };

export type GetAllItemsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAllItemsQuery = { __typename?: 'DotaQuery', constants?: { __typename?: 'ConstantQuery', items?: Array<{ __typename?: 'ItemType', id?: any | null, displayName?: string | null, shortName?: string | null } | null> | null } | null };


export const GetHeroByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetHeroById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Short"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hero"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roleId"}},{"kind":"Field","name":{"kind":"Name","value":"level"}}]}},{"kind":"Field","name":{"kind":"Name","value":"abilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slot"}},{"kind":"Field","name":{"kind":"Name","value":"ability"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"attributes"}},{"kind":"Field","name":{"kind":"Name","value":"lore"}},{"kind":"Field","name":{"kind":"Name","value":"aghanimDescription"}},{"kind":"Field","name":{"kind":"Name","value":"shardDescription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stat"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unitDamageType"}},{"kind":"Field","name":{"kind":"Name","value":"spellImmunity"}},{"kind":"Field","name":{"kind":"Name","value":"isGrantedByScepter"}},{"kind":"Field","name":{"kind":"Name","value":"hasScepterUpgrade"}},{"kind":"Field","name":{"kind":"Name","value":"castRange"}},{"kind":"Field","name":{"kind":"Name","value":"castPoint"}},{"kind":"Field","name":{"kind":"Name","value":"channelTime"}},{"kind":"Field","name":{"kind":"Name","value":"cooldown"}},{"kind":"Field","name":{"kind":"Name","value":"damage"}},{"kind":"Field","name":{"kind":"Name","value":"manaCost"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"charges"}},{"kind":"Field","name":{"kind":"Name","value":"hasShardUpgrade"}},{"kind":"Field","name":{"kind":"Name","value":"isGrantedByShard"}},{"kind":"Field","name":{"kind":"Name","value":"dispellable"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isTalent"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lore"}}]}},{"kind":"Field","name":{"kind":"Name","value":"talents"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abilityId"}},{"kind":"Field","name":{"kind":"Name","value":"slot"}}]}},{"kind":"Field","name":{"kind":"Name","value":"stats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enabled"}},{"kind":"Field","name":{"kind":"Name","value":"attackType"}},{"kind":"Field","name":{"kind":"Name","value":"startingArmor"}},{"kind":"Field","name":{"kind":"Name","value":"startingMagicArmor"}},{"kind":"Field","name":{"kind":"Name","value":"startingDamageMin"}},{"kind":"Field","name":{"kind":"Name","value":"startingDamageMax"}},{"kind":"Field","name":{"kind":"Name","value":"attackRate"}},{"kind":"Field","name":{"kind":"Name","value":"attackRange"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAttribute"}},{"kind":"Field","name":{"kind":"Name","value":"strengthBase"}},{"kind":"Field","name":{"kind":"Name","value":"strengthGain"}},{"kind":"Field","name":{"kind":"Name","value":"intelligenceBase"}},{"kind":"Field","name":{"kind":"Name","value":"intelligenceGain"}},{"kind":"Field","name":{"kind":"Name","value":"agilityBase"}},{"kind":"Field","name":{"kind":"Name","value":"agilityGain"}},{"kind":"Field","name":{"kind":"Name","value":"hpRegen"}},{"kind":"Field","name":{"kind":"Name","value":"mpRegen"}},{"kind":"Field","name":{"kind":"Name","value":"moveSpeed"}},{"kind":"Field","name":{"kind":"Name","value":"moveTurnRate"}},{"kind":"Field","name":{"kind":"Name","value":"hpBarOffset"}},{"kind":"Field","name":{"kind":"Name","value":"visionDaytimeRange"}},{"kind":"Field","name":{"kind":"Name","value":"visionNighttimeRange"}},{"kind":"Field","name":{"kind":"Name","value":"complexity"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetHeroByIdQuery, GetHeroByIdQueryVariables>;
export const GetAbilitiesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAbilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"abilities"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetAbilitiesQuery, GetAbilitiesQueryVariables>;
export const GetAllHeroesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllHeroes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"heroes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllHeroesQuery, GetAllHeroesQueryVariables>;
export const GetAllItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"constants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"shortName"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllItemsQuery, GetAllItemsQueryVariables>;