import { Image, Tooltip } from "@nextui-org/react";

import { IMAGE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Props = {
  type: "ban" | "pick";

  heroShortName: string | null | undefined;
  tooltipText: any;
  wasBannedSuccessfully?: boolean | null;
};
export default function PickBanItem({
  type,
  heroShortName,
  tooltipText,
  wasBannedSuccessfully,
}: Props) {
  return (
    <div>
      <Tooltip content={tooltipText}>
        <div className="relative">
          <Image
            alt=""
            className={cn({ grayscale: type === "ban" })}
            src={IMAGE.url + heroShortName + IMAGE.icon}
          />
          {wasBannedSuccessfully && (
            <div className="absolute left-1/2 top-1/2 z-10 h-[3px] w-full -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-red-600" />
          )}
        </div>
      </Tooltip>
    </div>
  );
}
