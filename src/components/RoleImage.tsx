import { Image } from "@heroui/react";

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
export default function RoleImage({ role, lane, position, size = 16 }: Props) {
  const getRole = position
    ? getPositionInfo(position)
    : getRoleInfo(role, lane);
  if (!getRole?.image) return null;
  return (
    <Tooltip content={getRole?.name}>
      <Image
        alt=""
        className="min-w-[14px]"
        height={14}
        radius="none"
        src={getRole?.image}
        width={size}
      />
    </Tooltip>
  );
}
