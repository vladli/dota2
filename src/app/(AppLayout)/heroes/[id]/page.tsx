import { getHero } from "@/actions/actions";
import { HERO_VIDEO } from "@/lib/constants";
import { getHeroName } from "@/lib/utils";

import HeroCard from "./HeroCard";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const data = await getHero(Number(params.id));
  return (
    <main>
      <section className="relative flex h-[15rem] justify-around bg-content1">
        <div className="relative flex h-full w-full items-center justify-center md:justify-start">
          <HeroCard hero={data} />
        </div>
        <div className="hidden w-[20rem] md:flex">
          <video
            autoPlay
            loop
          >
            <source
              src={HERO_VIDEO + getHeroName(data.img) + ".webm"}
              type="video/webm"
            />
          </video>
        </div>
      </section>
    </main>
  );
}
