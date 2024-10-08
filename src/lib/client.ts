import { HttpLink } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
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
