import { NextAuthOptions } from "next-auth";
export const authOptions: NextAuthOptions = {
  debug: false,
  session: {
    strategy: "jwt",
  },
  providers: [SteamProvider(_, { c })],
};
