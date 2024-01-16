"use client";
import toast from "react-hot-toast";
import { Button, Image } from "@nextui-org/react";
import { format } from "date-fns";
import { icons } from "lucide-react";

import { GetMatchByIdQuery } from "@/graphql/match";
import { cn, getRankName, getRegionName } from "@/lib/utils";

type Props = {
  data: GetMatchByIdQuery;
};
export default function MatchInfo({ data }: Props) {
  const match = data.match;
  return (
    <div className="flex h-12 w-full items-center justify-between border-y-1 border-divider bg-black px-4 text-sm">
      <div className="flex gap-4">
        <Item
          icon="Globe2"
          text={getRegionName(match?.regionId)}
        />
        <Button
          className="cursor-copy"
          onClick={() => {
            toast.success("Copied to clipboard");
            navigator.clipboard.writeText(match?.id);
          }}
          size="sm"
          variant="light"
        >
          <Item
            className="hidden lg:flex"
            icon="Files"
            text={match?.id}
          />
        </Button>

        <Item
          text={
            <div className="flex items-center gap-1">
              <div className="relative my-auto">
                {match?.rank?.toString()[1] !== "0" && (
                  <Image
                    alt="rankStar"
                    className="absolute -top-1"
                    src={`/img/ranks/rank_star_${
                      match?.rank?.toString()[1]
                    }.png`}
                    width={30}
                  />
                )}
                <Image
                  alt="rank"
                  src={`/img/ranks/${match?.rank?.toString()[0]}.png`}
                  width={30}
                />
              </div>
              <span>{getRankName(match?.rank?.toString()[0]!)}</span>
            </div>
          }
        />
      </div>
      <Item
        icon="CalendarDays"
        text={format(match?.endDateTime * 1000, "MMM d, HH:mm")}
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
        "flex items-center gap-1 font-medium text-foreground-600 select-none",
        className
      )}
    >
      {LucideIcon && (
        <LucideIcon
          name={icon}
          size={20}
        />
      )}
      {text}
    </span>
  );
}
