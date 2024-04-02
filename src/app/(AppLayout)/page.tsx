import Image from "next/image";

import { cn } from "@/lib/utils";

import { albertus_font } from "../fonts";

export default function page() {
  return (
    <div className="absolute h-[calc(100dvh-4rem)] w-full">
      <div className="absolute z-20 flex size-full select-none flex-col items-center justify-center opacity-80">
        <Image
          alt="Dota 2"
          draggable={false}
          height={200}
          src="/img/dota2.png"
          width={200}
        />
        <h1
          className={cn(
            albertus_font.className,
            "text-5xl uppercase font-semibold"
          )}
        >
          Dota 2 STATS
        </h1>
      </div>

      <div className="absolute size-full bg-black/40" />
      <video
        autoPlay
        className="size-full object-cover"
        loop
        playsInline
        preload="auto"
      >
        <source
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_webm.webm"
          type="video/webm"
        />
        <source
          src="https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/homepage/dota_montage_02.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
