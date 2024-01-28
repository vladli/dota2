import { Image } from "@nextui-org/react";
import { CheckCircle2, EyeOff } from "lucide-react";
import Link from "next/link";

import { IMAGE } from "@/lib/constants";
import { Maybe, SteamAccountType } from "@/types/types.generated";

import Tooltip from "./Tooltip";

type Props = {
  isLink?: boolean;
  showTeamTag?: boolean;
  showProIcon?: boolean;
  showHiddenProfileIcon?: boolean;
  iconSize?: number;
  steamAccount: Maybe<SteamAccountType> | undefined;
};
export default function PlayerName({
  isLink = true,
  showTeamTag = true,
  showProIcon = true,
  showHiddenProfileIcon = true,
  iconSize = 14,
  steamAccount,
}: Props) {
  const proPlayer = steamAccount?.proSteamAccount;
  const teamRender = proPlayer?.team?.tag ? (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          <Image
            alt="Team Logo"
            draggable={false}
            height={40}
            src={IMAGE.urlTeam + proPlayer.team.id + ".png"}
            width={40}
          />
          <span className="text-large font-medium">{proPlayer.team.name}</span>
        </div>
      }
      showArrow
    >
      <Link
        className="text-foreground-500"
        href={"/teams/" + proPlayer.team.id}
      >
        {proPlayer.team.tag + "."}
      </Link>
    </Tooltip>
  ) : null;
  if (proPlayer)
    return (
      <span className="flex items-center gap-x-2">
        {proPlayer && showProIcon && (
          <Tooltip
            content="Pro Player"
            showArrow
          >
            <div className="flex items-center">
              <CheckCircle2
                color="#0284c7"
                size={iconSize}
              />
            </div>
          </Tooltip>
        )}
        {showHiddenProfileIcon && steamAccount.isAnonymous && (
          <Tooltip
            content="Anonymous"
            showArrow
          >
            <div className="flex items-center">
              <EyeOff
                color="#52525b"
                size={iconSize}
              />
            </div>
          </Tooltip>
        )}
        {isLink ? (
          <div className="flex">
            {showTeamTag && teamRender}
            <Link
              className="w-fit"
              href={`/players/${steamAccount.id}`}
            >
              {proPlayer.name}
            </Link>
          </div>
        ) : (
          <div className="flex">
            {showTeamTag && teamRender}
            {proPlayer.name}
          </div>
        )}
      </span>
    );
  return isLink ? (
    <Link
      className="w-fit"
      href={`/players/${steamAccount?.id}`}
    >
      {steamAccount?.name}
    </Link>
  ) : (
    <span>{steamAccount?.name}</span>
  );
}
