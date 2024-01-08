import { GetAbilitiesDocument, GetHeroByIdQuery } from "@/graphql/constants";
import { getClient } from "@/lib/client";

type Props = {
  data: GetHeroByIdQuery;
};
export default async function HeroTalents({ data }: Props) {
  const { data: abilities } = await getClient().query({
    query: GetAbilitiesDocument,
  });
  const getAbility = (id: number) =>
    abilities.constants?.abilities?.find((ability) => ability?.id === id);
  const heroAbilities = (slot: number) =>
    getAbility(data.constants?.hero?.talents?.[slot]?.abilityId)?.language
      ?.displayName;
  return (
    <section className="m-4 flex flex-col items-center gap-4">
      <h1 className="text-xl font-semibold uppercase">Talents</h1>
      {data && (
        <section className="grid grid-rows-4 gap-y-[0.15rem]">
          <Talent
            left={heroAbilities(7)!}
            level={25}
            right={heroAbilities(6)!}
          />
          <Talent
            left={heroAbilities(5)!}
            level={20}
            right={heroAbilities(4)!}
          />
          <Talent
            left={heroAbilities(3)!}
            level={15}
            right={heroAbilities(2)!}
          />
          <Talent
            left={heroAbilities(1)!}
            level={10}
            right={heroAbilities(0)!}
          />
        </section>
      )}
    </section>
  );
}

const Talent = ({
  left,
  right,
  level,
}: {
  left: string;
  right: string;
  level: number;
}) => {
  return (
    <div className="grid grid-cols-11">
      <div className="col-span-5 flex items-center justify-center border border-neutral-700 p-2">
        {left}
      </div>
      <div className="col-span-1 flex items-center justify-center border-y border-neutral-700 p-2 font-bold text-yellow-500">
        {level}
      </div>
      <div className="col-span-5 flex items-center justify-center border border-neutral-700 p-2">
        {right}
      </div>
    </div>
  );
};
