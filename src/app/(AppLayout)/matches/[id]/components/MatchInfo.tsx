"use client";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { icons } from "lucide-react";

import RankImage from "@/components/RankImage";
import { GetMatchByIdQuery } from "@/graphql/match";
import dayjs from "@/lib/dayjs";
import { cn, getRankName, getRegionName } from "@/lib/utils";

type Props = {
  data: GetMatchByIdQuery;
};
export default function MatchInfo({ data }: Props) {
  const match = data.match;
  return (
    <div className="flex h-12 w-full items-center justify-between border-y-1 border-divider bg-black px-4 text-sm">
      <div className="flex gap-4">
        <Item icon="Globe2" text={getRegionName(match?.regionId)} />
        <Button
          className="hidden cursor-copy lg:flex"
          onClick={() => {
            toast.success("Copied to clipboard");
            navigator.clipboard.writeText(match?.id);
          }}
          size="sm"
          variant="light"
        >
          <Item icon="Files" text={match?.id} />
        </Button>
        {match?.rank ? (
          <Item
            text={
              <div className="flex items-center gap-1">
                <div className="relative my-auto">
                  <RankImage rank={match.rank} width={30} />
                </div>
                <span>{getRankName(match?.rank?.toString()[0]!)}</span>
              </div>
            }
          />
        ) : null}
      </div>
      <Item
        icon="CalendarDays"
        text={dayjs(match?.endDateTime * 1000).format("MMM D, HH:mm")}
      />
    </div>
  );
}

function Item({
  className,
  text,
  icon,
}: {
  className?: string;
  text: string | null | undefined | any;
  icon?: string;
}) {
  const LucideIcon = icon ? icons[icon as keyof typeof icons] : null;
  return (
    <span
      className={cn(
        "flex select-none items-center gap-1 font-medium text-foreground-600",
        className,
      )}
    >
      {LucideIcon && <LucideIcon name={icon} size={20} />}
      {text}
    </span>
  );
}
