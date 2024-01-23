import ReactCountryFlag from "react-country-flag";

import { Maybe, SteamAccountType } from "@/types/types.generated";

type Props = {
  steamAccount?: Maybe<SteamAccountType> | undefined;
};
export default function PlayerCountry({ steamAccount }: Props) {
  const country = steamAccount?.countryCode
    ? steamAccount.countryCode
    : steamAccount?.proSteamAccount?.countries?.[0]
    ? steamAccount.proSteamAccount.countries[0]
    : null;
  if (!country) return null;
  return (
    <ReactCountryFlag
      aria-label="United States"
      countryCode={country}
      svg
    />
  );
}
