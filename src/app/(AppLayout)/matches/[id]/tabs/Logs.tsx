import { Fragment } from "react";
import { Image } from "@nextui-org/react";
import { MessageSquareQuote, Sword, Swords } from "lucide-react";

import Alert from "@/components/Alert";
import { GetAllHeroesQuery } from "@/graphql/constants";
import { GetMatchByIdQuery } from "@/graphql/match";
import { IMAGE } from "@/lib/constants";
import { cn, convertToHumanReadable, secondsToTime } from "@/lib/utils";
import { RuneAction, RuneEnums } from "@/types/types.generated";

type Props = {
  data: GetMatchByIdQuery;
  heroes: GetAllHeroesQuery;
};

type TalkEventProps = {
  type: "talk";
  time: number;
  message?: string | null | undefined;
  isRadiant: boolean | null | undefined;
  heroId: number | null | undefined;
  hero: {
    displayName: string | null | undefined;
    shortName: string | null | undefined;
  };
  playerName: string | null | undefined;
};

type TowerDeathEventProps = {
  type: "towerDeath";
  time: number;
  npcId: number;
  isRadiant: boolean;
  attacker?: number | null;
};

type KillEventProps = {
  type: "kill";
  time: number;
  target?: number | null | undefined;
  isRadiant: boolean | null | undefined;
  heroId: number | null | undefined;
  hero: {
    displayName: string | null | undefined;
    shortName: string | null | undefined;
  };
  playerName: string | null | undefined;
};

type RuneEventProps = {
  type: "runes";
  time: number;
  rune?: RuneEnums | null | undefined;
  action?: RuneAction | null | undefined;
  isRadiant: boolean | null | undefined;
  heroId: number | null | undefined;
  hero: {
    displayName: string | null | undefined;
    shortName: string | null | undefined;
  };
  playerName: string | null | undefined;
};

type AllEvent =
  | TowerDeathEventProps
  | KillEventProps
  | RuneEventProps
  | TalkEventProps;

export default function TabLogs({ data, heroes }: Props) {
  const towerDeaths = data.match?.towerDeaths || [];

  if (data?.match?.players?.[0]?.stats?.experiencePerMinute === null)
    return <Alert text="No data available." />;
  const killEvents: KillEventProps[] = (data.match?.players || []).reduce<
    KillEventProps[]
  >(
    (acc, player) =>
      acc.concat(
        (player?.stats?.killEvents || []).map<KillEventProps>((killEvent) => ({
          ...killEvent,
          isRadiant: player?.isRadiant,
          heroId: player?.heroId ?? null,
          hero: {
            displayName: player?.hero?.displayName ?? null,
            shortName: player?.hero?.shortName ?? null,
          },
          playerName: player?.steamAccount?.name ?? null,
          type: "kill",
          time: killEvent?.time ?? 0,
        }))
      ),
    []
  );
  const runeEvents: RuneEventProps[] = (data.match?.players || []).reduce<
    RuneEventProps[]
  >(
    (acc, player) =>
      acc.concat(
        (player?.stats?.runes || []).map<RuneEventProps>((runeEvent) => ({
          ...runeEvent,
          isRadiant: player?.isRadiant,
          heroId: player?.heroId ?? null,
          hero: {
            displayName: player?.hero?.displayName ?? null,
            shortName: player?.hero?.shortName ?? null,
          },
          playerName: player?.steamAccount?.name ?? null,
          type: "runes",
          time: runeEvent?.time ?? 0,
        }))
      ),
    []
  );
  const talkEvents: TalkEventProps[] = (data.match?.players || []).reduce<
    TalkEventProps[]
  >(
    (acc, player) =>
      acc.concat(
        (player?.stats?.allTalks || []).map<TalkEventProps>((talkEvent) => ({
          ...talkEvent,
          isRadiant: player?.isRadiant,
          heroId: player?.heroId ?? null,
          hero: {
            displayName: player?.hero?.displayName ?? null,
            shortName: player?.hero?.shortName ?? null,
          },
          playerName: player?.steamAccount?.name ?? null,
          type: "talk",
          time: talkEvent?.time ?? 0,
        }))
      ),
    []
  );
  const allEvents: AllEvent[] = [
    ...(towerDeaths.map((event) => ({
      ...event,
      type: "towerDeath",
    })) as AllEvent[]),
    ...(killEvents.map((event) => ({
      ...event,
      type: "kill",
    })) as AllEvent[]),
    ...(runeEvents.map((event) => ({
      ...event,
      type: "runes",
    })) as AllEvent[]),
    ...(talkEvents.map((event) => ({
      ...event,
      type: "talk",
    })) as AllEvent[]),
  ];
  const sortedEvents = allEvents.sort((a, b) => (a.time || 0) - (b.time || 0));
  const interval = 300; // 5 minutes in seconds
  let currentInterval = 0;

  return (
    <main className="rounded-large bg-content1 p-4">
      {sortedEvents.map((event, i) => {
        if (event.time >= currentInterval) {
          const dividerComponent = (
            <Fragment key={i}>
              <DividerComponent
                currentInterval={currentInterval}
                key={`divider-${currentInterval}`}
              />
              <div className="p-4">
                {event.type === "towerDeath" && (
                  <TowerDeathEvent
                    data={data}
                    event={event}
                  />
                )}
                {event.type === "kill" && (
                  <KillEvent
                    event={event}
                    heroes={heroes}
                  />
                )}
                {event.type === "runes" && <RuneEvent event={event} />}
                {event.type === "talk" && <TalkEvent event={event} />}
              </div>
            </Fragment>
          );
          currentInterval += interval;
          return dividerComponent;
        }
        return (
          <div
            className="p-4"
            key={i}
          >
            {event.type === "towerDeath" && (
              <TowerDeathEvent
                data={data}
                event={event}
              />
            )}
            {event.type === "kill" && (
              <KillEvent
                event={event}
                heroes={heroes}
              />
            )}
            {event.type === "runes" && <RuneEvent event={event} />}
            {event.type === "talk" && <TalkEvent event={event} />}
          </div>
        );
      })}
    </main>
  );
}

const DividerComponent = ({ currentInterval }: { currentInterval: number }) => (
  <div className="flex items-center gap-2">
    <div className="ml-14 h-[1px] w-full bg-divider" />
    <span className="text-foreground-400">{`${secondsToTime(
      Math.floor(currentInterval)
    )}`}</span>
    <div className="mr-14 h-[1px] w-full bg-divider" />
  </div>
);

const TowerDeathEvent = ({
  event,
  data,
}: {
  event: TowerDeathEventProps;
  data: GetMatchByIdQuery;
}) => {
  const attackerHero = data.match?.players?.find(
    (player) => player?.heroId === event.attacker
  );
  return (
    <LogWrapper
      isRadiant={!event.isRadiant}
      shortName={event.attacker ? attackerHero?.hero?.shortName : null}
      time={event.time}
    >
      <div className="flex items-center gap-1">
        <Swords
          size={18}
          stroke="#ef4444"
        />
        {attackerHero && (
          <span className="font-semibold text-white">
            {attackerHero?.steamAccount?.name}
          </span>
        )}
        destroyed{" "}
        <span className="font-semibold text-white">
          {convertToHumanReadable(event.npcId)}
        </span>
      </div>
    </LogWrapper>
  );
};

const KillEvent = ({
  event,
  heroes,
}: {
  event: KillEventProps;
  heroes: GetAllHeroesQuery;
}) => {
  const targetHero = heroes?.constants?.heroes?.find(
    (hero) => hero?.id === event.target
  );
  return (
    <LogWrapper
      isRadiant={event.isRadiant}
      shortName={event.hero.shortName}
      time={event.time}
    >
      <div className="flex items-center gap-1">
        <Sword
          size={18}
          stroke="#ef4444"
        />
        {`${event.playerName} killed `}

        <Image
          alt=""
          src={IMAGE.url + targetHero?.shortName + IMAGE.icon}
          width={22}
        />
        <span className="font-semibold text-white">
          {targetHero?.displayName}
        </span>
      </div>
    </LogWrapper>
  );
};

const RuneEvent = ({ event }: { event: RuneEventProps }) => (
  <LogWrapper
    isRadiant={event.isRadiant}
    shortName={event.hero.shortName}
    time={event.time}
  >
    <p>
      {`${event.playerName} activated `}
      <span
        className={cn("capitalize font-semibold", {
          "text-pink-500": event.rune === "ARCANE",
          "text-yellow-500": event.rune === "BOUNTY",
          "text-blue-800": event.rune === "DOUBLE_DAMAGE",
          "text-red-600": event.rune === "HASTE",
          "text-yellow-600": event.rune === "ILLUSION",
          "text-violet-600": event.rune === "INVISIBILITY",
          "text-green-500": event.rune === "REGEN",
          "text-gray-500": event.rune === "SHIELD",
          "text-blue-500": event.rune === "WATER",
          "text-indigo-600": event.rune === "WISDOM",
        })}
      >
        {event.rune?.replace(/_/g, " ").toLowerCase()}
      </span>
      {` rune`}
    </p>
  </LogWrapper>
);

const TalkEvent = ({ event }: { event: TalkEventProps }) => (
  <LogWrapper
    isRadiant={event.isRadiant}
    shortName={event.hero.shortName}
    time={event.time}
  >
    <div className="flex items-center gap-1">
      <MessageSquareQuote
        size={18}
        stroke="#60a5fa"
      />
      {`${event.playerName}: `}
      <span className="font-semibold text-white">{event.message} </span>
    </div>
  </LogWrapper>
);

const LogWrapper = ({
  isRadiant,
  shortName,
  children,
  time,
}: {
  isRadiant?: boolean | null | undefined;
  shortName?: string | null | undefined;
  children: any;
  time: number;
}) => (
  <div
    className={cn("flex justify-start items-center gap-2 text-foreground-600", {
      "flex-row-reverse": !isRadiant,
    })}
  >
    {shortName && (
      <Image
        alt=""
        src={IMAGE.url + shortName + IMAGE.horizontal}
        width={80}
      />
    )}
    <div
      className={cn("flex gap-4 items-center", {
        "flex-row-reverse": !isRadiant,
      })}
    >
      {children}
      <span>{secondsToTime(time)}</span>
    </div>
  </div>
);
