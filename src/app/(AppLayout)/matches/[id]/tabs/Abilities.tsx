import { Divider, Image } from "@nextui-org/react";

import HeroImage from "@/components/HeroImage";
import PlayerName from "@/components/PlayerName";
import RoleImage from "@/components/RoleImage";
import Tooltip from "@/components/Tooltip";
import { GetMatchByIdQuery } from "@/graphql/match";
import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MatchPlayerType, PlayerAbilityType } from "@/types/types.generated";

type Props = {
  data: GetMatchByIdQuery;
};

function compareLaneAndRole(a: any, b: any) {
  const positionOrder: any = {
    POSITION_1: 1,
    POSITION_2: 2,
    POSITION_3: 3,
    POSITION_4: 4,
    POSITION_5: 5,
  };
  const positionA = positionOrder[a.position];
  const positionB = positionOrder[b.position];
  if (positionA === undefined || positionB === undefined) {
    return 0;
  }
  return positionA - positionB;
}

export default function Abilities({ data }: Props) {
  const sortedRadiant = data.match?.players
    ?.filter((player) => player?.isRadiant)
    .toSorted(compareLaneAndRole);
  const sortedDire = data.match?.players
    ?.filter((player) => !player?.isRadiant)
    .toSorted(compareLaneAndRole);
  return (
    <main className="flex flex-col overflow-x-auto rounded-large bg-content1 p-2 scrollbar-thin scrollbar-thumb-content2">
      <section className="flex gap-2">
        <div className="w-5 shrink-0" />
        <div className="w-20 shrink-0" />
        <div className="w-36 shrink-0" />
        <div className="size-8 shrink-0" />
        {Array.from({ length: 30 }).map((item, i) => (
          <div
            className="flex size-12 shrink-0 justify-center"
            key={i + 1}
          >
            <span
              className={cn({
                "text-yellow-500": i + 1 == 6 || i + 1 == 12 || i + 1 == 18,
              })}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-y-3 py-4">
        <Table players={sortedRadiant} />
        <Divider />
        <Table players={sortedDire} />
      </section>
    </main>
  );
}

function Table({
  players,
}: {
  players: (MatchPlayerType | null)[] | undefined;
}) {
  const addAtr: PlayerAbilityType = {
    abilityId: 730,
    isTalent: true,
    level: 0,
    time: 0,
    abilityType: {
      id: 730,
      name: "special_bonus_attributes",
    },
  };
  const levelsToAddAtr = [16, 18, 20, 21, 22, 23, 25];
  return (
    <>
      {players?.map((player) => {
        const abilities = [...(player?.abilities || [])];
        if (abilities?.length) {
          levelsToAddAtr.forEach((level) => {
            if (level <= abilities.length) {
              abilities.splice(level, 0, addAtr);
            }
          });
        }
        return (
          <div
            className="px-2"
            key={player?.heroId}
          >
            <div className="flex items-center gap-2 ">
              <div className="w-5 shrink-0 ">
                <RoleImage position={player?.position} />
              </div>
              <div className="w-20 shrink-0 ">
                <HeroImage
                  displayName={player?.hero?.displayName!}
                  heroId={player?.heroId}
                  isTooltip
                  shortName={player?.hero?.shortName}
                />
              </div>
              <div className="flex w-36 shrink-0">
                <PlayerName
                  showTeamTag={false}
                  steamAccount={player?.steamAccount}
                />
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-divider">
                {player?.level}
              </div>
              {Array.from({ length: player?.level }).map((_, i) => {
                const ability = abilities?.[i];

                return (
                  <div
                    className="flex size-12 shrink-0 items-center"
                    key={i}
                  >
                    {!ability?.isTalent ? (
                      <Tooltip
                        content={
                          <div className="flex flex-col">
                            {ability?.abilityType?.language?.displayName}
                            <span>Level {(ability?.level || 0) + 1}</span>
                          </div>
                        }
                      >
                        <Image
                          alt=""
                          src={
                            IMAGE.urlAbility +
                            ability?.abilityType?.name +
                            ".png"
                          }
                          width={40}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        content={
                          ability?.abilityType?.language?.displayName ||
                          "+2 to All Attributes"
                        }
                      >
                        <Image
                          alt=""
                          src="/img/other/talents.png"
                          width={40}
                        />
                      </Tooltip>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
