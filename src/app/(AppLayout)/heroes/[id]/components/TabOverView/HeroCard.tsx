import { Image } from "@nextui-org/react";

import { GetHeroByIdQuery } from "@/graphql/constants";
import { HERO_ATTRIBUTE, IMAGE } from "@/lib/constants";

type Props = {
  data: GetHeroByIdQuery;
};

export default function HeroCard({ data }: Props) {
  const hero = data.constants?.hero;
  return (
    <section className="mx-10 flex items-center gap-4">
      <Image
        alt="hero"
        draggable={false}
        src={IMAGE.url + hero?.shortName + IMAGE.vertical}
        width={120}
      />
      <div>
        <h2 className="flex items-center gap-1 text-lg font-medium uppercase">
          <Image
            alt="icon"
            draggable={false}
            height={24}
            src={
              HERO_ATTRIBUTE[
                hero?.stats?.primaryAttribute as keyof typeof HERO_ATTRIBUTE
              ].img
            }
            width={24}
          />
          {
            HERO_ATTRIBUTE[
              hero?.stats?.primaryAttribute as keyof typeof HERO_ATTRIBUTE
            ].name
          }
        </h2>
        <h1 className="text-3xl">{hero?.displayName}</h1>
        <h2 className="flex flex-wrap gap-2 font-medium text-foreground-500">
          {hero?.roles
            ? hero?.roles.map((role, index) => (
                <div key={index}>{role?.roleId}</div>
              ))
            : null}
        </h2>
        <h3 className="flex items-center gap-2 text-lg font-medium">
          <Image
            alt=""
            draggable={false}
            radius="none"
            src={`/img/hero_stats/${hero?.stats?.attackType}.svg`}
            width={24}
          />
          {hero?.stats?.attackType}
        </h3>
      </div>
    </section>
  );
}
