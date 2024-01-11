import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from "@apollo/experimental-nextjs-app-support/ssr";

export const { getClient } = registerApolloClient(() => {
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            constants: {
              merge: true,
            },
            player: {
              merge: true,
            },
          },
        },

        AbilityType: {
          fields: {
            language: {
              merge: true,
            },
          },
        },
        HeroStatType: {
          merge: true,
        },
      },
    }),

    link: new HttpLink({
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API}`,
      },
      uri: "https://api.stratz.com/graphql",
    }),
  });
});
