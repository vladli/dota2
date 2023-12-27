import { ReadonlyURLSearchParams } from "next/navigation";

export function createQueryString(
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams
) {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
}

export function deleteQueryString(
  name: string,
  searchParams: ReadonlyURLSearchParams
) {
  const params = new URLSearchParams(searchParams);
  params.delete(name);
  return params.toString();
}
