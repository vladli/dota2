import { Image } from "@nextui-org/react";

import { getPositionInfo, getRoleInfo } from "@/lib/utils";
import {
  MatchLaneType,
  MatchPlayerPositionType,
  MatchPlayerRoleType,
} from "@/types/types.generated";

import Tooltip from "./Tooltip";

type Props = {
  isTooltip?: boolean;
  role?: MatchPlayerRoleType | undefined | null;
  lane?: MatchLaneType | undefined | null;
  position?: MatchPlayerPositionType | undefined | null;
  size?: number;
};
export default function RoleImage({
  isTooltip,
  role,
  lane,
  position,
  size = 16,
}: Props) {
  const getRole = position
    ? getPositionInfo(position)
    : getRoleInfo(role, lane);
  return (
    <Tooltip content={getRole?.name}>
      <Image
        alt=""
        className="min-w-[14px]"
        height={14}
        radius="none"
        src={getRole?.image || ""}
        width={size}
      />
    </Tooltip>
  );
}
