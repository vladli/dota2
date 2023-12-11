import { NextRequest } from "next/server";
import NextAuth from "next-auth";
import SteamProvider from "next-auth-steam";

import { steamID64ToSteamID3 } from "@/lib/utils";

async function handler(
  req: NextRequest,
  ctx: {
    params: {
      nextauth: string[];
    };
  }
) {
  // @ts-ignore
  return NextAuth(req, ctx, {
    debug: false,
    session: {
      strategy: "jwt",
    },
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
      SteamProvider(req, {
        // @ts-ignore
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: "http://localhost:3000/api/auth/callback",
      }),
    ],
  });
}

export { handler as GET, handler as POST };
