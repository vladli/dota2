"use client";

import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Input, Listbox, ListboxItem, ListboxSection } from "@nextui-org/react";
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";

import { GetSearchDocument } from "@/graphql/stratz";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function SearchBar({ className }: Props) {
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

  const matches = data?.stratz?.search?.matches || [];
  const players = data?.stratz?.search?.players || [];

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
      />
      {search && !loading && (
        <div className="absolute top-10 w-full rounded-small bg-content1">
          <Listbox
            aria-label="Search results"
            onAction={() => setSearch("")}
          >
            <ListboxSection
              hidden={matches.length === 0}
              title="Matches"
            >
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
            <ListboxSection
              hidden={players.length === 0}
              title="Players"
            >
              {players?.map((player) => (
                <ListboxItem
                  as={Link}
                  href={`/players/${player?.id}`}
                  key={player?.id}
                >
                  {player?.name}
                </ListboxItem>
              ))}
            </ListboxSection>
          </Listbox>
        </div>
      )}
    </div>
  );
}
