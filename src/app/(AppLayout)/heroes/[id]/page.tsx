import { getHero } from "@/actions/actions";
import { HERO_VIDEO } from "@/lib/constants";
import { getHeroName } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const data = await getHero(Number(params.id));
  return (
    <main>
      <section className="relative h-[15rem] bg-content1">
        <div className="relative flex h-full w-full items-center">
          {data.localized_name}
        </div>
        <div className="absolute right-0 top-0 w-[20rem]">
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
