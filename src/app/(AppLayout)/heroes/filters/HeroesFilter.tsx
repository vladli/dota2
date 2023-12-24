"use client";

import { useCallback, useEffect, useState } from "react";
import { Image, Select, SelectItem } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { GetAllHeroesQuery } from "@/graphql/constants";
import { IMAGE } from "@/lib/constants";

type Props = {
  heroes: GetAllHeroesQuery;
};

export default function HeroesFilter({ heroes }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );
  const deleteQueryString = useCallback(
    (name: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name);
      return router.push(pathname + "?" + params.toString());
    },
    [searchParams]
  );
  const [values, setValues] = useState<any>([]);
  useEffect(() => {
    const array = Array.from(values);
    if (array.length > 0) {
      createQueryString("heroId", Array.from(values).join(", "));
    } else deleteQueryString("heroId");
  }, [values]);

  return (
    <Select
      className="max-w-[10rem]"
      label="Select hero"
      onSelectionChange={setValues}
      selectedKeys={values}
      selectionMode="multiple"
      size="sm"
    >
      {heroes.constants!.heroes!.map((hero) => (
        <SelectItem
          key={hero?.id}
          startContent={
            <Image
              alt="hero"
              className="h-6 w-6"
              radius="none"
              src={IMAGE.url + hero?.shortName + IMAGE.icon}
            />
          }
        >
          {hero?.displayName}
        </SelectItem>
      ))}
    </Select>
  );
}
