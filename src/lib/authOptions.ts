import { NextApiRequest } from "next/types";
import { AuthOptions } from "next-auth";
import SteamProvider from "next-auth-steam";

import { steamID64ToSteamID3 } from "./utils";

export function getAuthOptions(req?: NextApiRequest): AuthOptions {
  return {
    callbacks: {
      jwt({ token, account, profile }) {
        if (account?.provider === "steam") {
          token.steamId = steamID64ToSteamID3(account.steamId as string);
          // @ts-expect-error
          token.steam = profile;
        }

        return token;
      },
      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steamId = token.steamId;
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
    },
    providers: [
      SteamProvider(req!, {
        // @ts-ignore
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: process.env.NEXTAUTH_URL + "/api/auth/callback",
      }),
    ],
  };
}
