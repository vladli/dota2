import { Image } from "@heroui/react";
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
  return (
    <div className="flex items-center gap-1">
      <ProPlayerIcon
        iconSize={iconSize}
        show={showProIcon}
        steamAccount={steamAccount}
      />
      <AnonymousIcon
        iconSize={iconSize}
        show={showHiddenProfileIcon}
        steamAccount={steamAccount}
      />
      <div className="flex">
        <TeamTag show={showTeamTag} steamAccount={steamAccount} />
        <Name isLink={isLink} steamAccount={steamAccount} />
      </div>
    </div>
  );
}

type BlockProps = {
  show?: boolean;
  isLink?: boolean;
  steamAccount: Maybe<SteamAccountType> | undefined;
  iconSize?: number;
};

function AnonymousIcon({ show, steamAccount, iconSize }: BlockProps) {
  if (!show || !steamAccount?.isAnonymous) return null;
  return (
    <Tooltip content="Anonymous" showArrow>
      <div className="flex items-center">
        <EyeOff color="#52525b" size={iconSize} />
      </div>
    </Tooltip>
  );
}

function ProPlayerIcon({ show, steamAccount, iconSize }: BlockProps) {
  if (!show || !steamAccount?.proSteamAccount) return null;
  return (
    <Tooltip content="Pro Player" showArrow>
      <div className="flex items-center">
        <CheckCircle2 color="#0284c7" size={iconSize} />
      </div>
    </Tooltip>
  );
}

function TeamTag({ show, steamAccount }: BlockProps) {
  if (!show || !steamAccount?.proSteamAccount?.team?.tag) return null;
  const proPlayer = steamAccount.proSteamAccount;
  return (
    <Tooltip
      content={
        <div className="flex items-center gap-2">
          <Image
            alt="Team Logo"
            draggable={false}
            height={40}
            src={IMAGE.urlTeam + proPlayer?.team?.id + ".png"}
            width={40}
          />
          <span className="text-large font-medium">
            {proPlayer?.team?.name}
          </span>
        </div>
      }
      showArrow
    >
      <Link
        className="text-foreground-500"
        href={"/teams/" + proPlayer?.team?.id}
      >
        {proPlayer?.team?.tag + "."}
      </Link>
    </Tooltip>
  );
}

function Name({ isLink, steamAccount }: BlockProps) {
  if (!steamAccount) return null;
  const proPlayer = steamAccount.proSteamAccount;
  if (proPlayer)
    return isLink ? (
      <Link className="text-foreground-500" href={"/players/" + proPlayer.id}>
        {proPlayer.name}
      </Link>
    ) : (
      <span>{proPlayer.name}</span>
    );
  return isLink ? (
    <Link className="text-foreground-700" href={"/players/" + steamAccount.id}>
      {steamAccount.name}
    </Link>
  ) : (
    <span>{steamAccount.name}</span>
  );
}
