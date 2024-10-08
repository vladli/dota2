"use client";
import React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";

loadDevMessages();
loadErrorMessages();

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://api.stratz.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRATZ_API}`,
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

type Props = {
  children: React.ReactNode;
  session: any;
};
export default function Providers({ children, session }: Props) {
  return (
    <>
      <ApolloNextAppProvider makeClient={makeClient}>
        <SessionProvider session={session}>
          <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
      </ApolloNextAppProvider>
    </>
  );
}
