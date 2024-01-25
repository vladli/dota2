import { Image } from "@nextui-org/react";
import Link from "next/link";

import { IMAGE } from "@/lib/constants";

import Tooltip from "./Tooltip";

type BaseProps = {
  isLink?: boolean;
  heroId?: number | undefined | null;
  shortName?: string | undefined | null;
  size?: number;
};

type TooltipProps = BaseProps & {
  isTooltip?: true;
  displayName: string;
};

type NonTooltipProps = BaseProps & {
  isTooltip?: false;
  displayName?: string | undefined | null;
};

type Props = TooltipProps | NonTooltipProps;
export default function HeroImage({
  isTooltip,
  isLink = true,
  heroId,
  shortName,
  displayName,
  size = 70,
}: Props) {
  const imageComponent = (
    <Image
      alt=""
      className="z-0 min-w-[70px]"
      src={IMAGE.url + shortName + IMAGE.horizontal}
      width={size}
    />
  );

  if (!isTooltip) {
    return isLink ? (
      <Link href={`/heroes/${heroId}`}>{imageComponent}</Link>
    ) : (
      imageComponent
    );
  }

  return (
    <Tooltip content={displayName}>
      {isLink ? (
        <Link href={`/heroes/${heroId}`}>{imageComponent}</Link>
      ) : (
        imageComponent
      )}
    </Tooltip>
  );
}
