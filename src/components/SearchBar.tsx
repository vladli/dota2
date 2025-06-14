"use client";

import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  Image,
  Input,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@heroui/react";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";

import { GetSearchDocument } from "@/graphql/stratz";
import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  setIsMenuOpen: (isOpen: boolean) => void;
};

export default function SearchBar({ className, setIsMenuOpen }: Props) {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search, 500);

  const [getSearch, { data, loading }] = useLazyQuery(GetSearchDocument, {
    variables: {
      request: {
        query: debounceSearch,
        take: 5,
      },
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (search) getSearch();
  }, [debounceSearch]);

  const handleClick = () => {
    setSearch("");
    setIsMenuOpen(false);
  };

  const matches = data?.stratz?.search?.matches || [];
  const players = data?.stratz?.search?.players || [];
  const proPlayers = data?.stratz?.search?.proPlayers || [];
  const teams = data?.stratz?.search?.teams || [];
  return (
    <div className="relative z-50">
      <Input
        className={cn("w-full", className)}
        classNames={{ inputWrapper: "h-2" }}
        isClearable
        onClear={() => setSearch("")}
        onValueChange={setSearch}
        placeholder="Search"
        size="sm"
        value={search}
        variant="bordered"
      />
      {search && data && !loading && (
        <div className="absolute top-10 w-full rounded-small bg-content1">
          <Listbox
            aria-label="Search results"
            onAction={handleClick}
            onClick={(e) => e.stopPropagation()}
          >
            <ListboxSection hidden={matches.length === 0} title="Matches">
              {matches?.map((match) => (
                <ListboxItem
                  as={Link}
                  href={`/matches/${match?.id}`}
                  key={match?.id}
                >
                  {match?.id}
                </ListboxItem>
              ))}
            </ListboxSection>
            <ListboxSection hidden={players.length === 0} title="Players">
              {players?.map((player) => (
                <ListboxItem
                  as={Link}
                  href={`/players/${player?.id}`}
                  key={player?.id}
                >
                  <div className="flex gap-2">
                    <Image
                      alt=""
                      radius="sm"
                      src={player?.avatar || ""}
                      width={20}
                    />
                    {player?.name}
                  </div>
                </ListboxItem>
              ))}
            </ListboxSection>
            <ListboxSection
              hidden={proPlayers.length === 0}
              title="Pro Players"
            >
              {proPlayers?.map((player) => (
                <ListboxItem
                  as={Link}
                  href={`/players/${player?.id}`}
                  key={player?.id}
                >
                  <div className="flex gap-2">
                    <Image
                      alt=""
                      radius="sm"
                      src={player?.avatar || ""}
                      width={20}
                    />
                    <p>
                      {player?.proSteamAccount?.team?.tag ? (
                        <span className="text-foreground-500">
                          {player?.proSteamAccount?.team?.tag}.
                        </span>
                      ) : null}
                      {player?.proSteamAccount?.name || player?.name}
                    </p>
                  </div>
                </ListboxItem>
              ))}
            </ListboxSection>
            <ListboxSection hidden={teams.length === 0} title="Teams">
              {teams?.map((team) => (
                <ListboxItem
                  as={Link}
                  href={`/teams/${team?.id}`}
                  key={team!.id}
                >
                  <div className="flex gap-2">
                    <Image
                      alt=""
                      radius="sm"
                      src={IMAGE.urlTeam + team?.id + ".png"}
                      width={20}
                    />
                    <span>{team?.name}</span>
                  </div>
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      )}
    </div>
  );
}
