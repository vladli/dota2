import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Maybe, SteamAccountType } from "@/types/types.generated";

import Tooltip from "./Tooltip";

type Props = {
  isLink?: boolean;
  showProIcon?: boolean;
  steamAccount?: Maybe<SteamAccountType> | undefined;
};
export default function PlayerName({
  isLink = true,
  showProIcon = true,
  steamAccount,
}: Props) {
  const proPlayer = steamAccount?.proSteamAccount;
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
                size={18}
              />
            </div>
          </Tooltip>
        )}
        {isLink ? (
          <Link
            className="w-fit"
            href={`/players/${steamAccount.id}`}
          >
            {proPlayer.name}
          </Link>
        ) : (
          <span>{proPlayer.name}</span>
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
