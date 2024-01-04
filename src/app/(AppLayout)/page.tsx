import Image from "next/image";

import { cn } from "@/lib/utils";

import { hypatia_font } from "../fonts";

export default function page() {
  return (
    <div>
      <div className="absolute top-0 z-20 flex h-[100dvh] w-full flex-col items-center justify-center opacity-80">
        <Image
          alt="Dota 2"
          height={200}
          src="/img/dota2.png"
          width={200}
        />
        <h1
          className={cn(
            hypatia_font.className,
            "text-5xl uppercase font-semibold"
          )}
        >
          Dota 2
        </h1>
      </div>

      <div className="absolute top-0 z-10 h-[100dvh] w-full bg-black/40" />
      <video
        autoPlay
        className="absolute top-0 h-[100dvh] object-cover"
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
