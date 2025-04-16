import { Image } from "@heroui/react";

import { cn, getHeroTier } from "@/lib/utils";

import Tooltip from "./Tooltip";

type Props = {
  className?: string;
  size?: number;
  level: number;
};
export default function DotaPlusImage({ level, className, size = 50 }: Props) {
  if (level <= 10)
    return (
      <div className={cn(className)}>
        <Tooltip content="Heroes with level less than 11 are not trackable">
          <Image
            alt=""
            className="grayscale"
            draggable={false}
            src="/img/hero_badge/hero_badge_1.png"
            width={size}
          />
        </Tooltip>
      </div>
    );
  return (
    <div className={cn("relative w-fit", className)}>
      <span
        className={cn(
          "absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/80 font-black",
          {
            "text-xs": size < 35,
            "text-sm": size < 50 && size >= 35,
          },
        )}
      >
        {level}
      </span>
      <Image
        alt=""
        className="z-0"
        draggable={false}
        src={getHeroTier(level)?.image}
        width={size}
      />
    </div>
  );
}
