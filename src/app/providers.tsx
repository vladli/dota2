"use client";
import React from "react";
import { ApolloLink, HttpLink } from "@apollo/client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
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

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
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
  const router = useRouter();
  return (
    <>
      <ApolloNextAppProvider makeClient={makeClient}>
        <SessionProvider session={session}>
          <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </SessionProvider>
      </ApolloNextAppProvider>
    </>
  );
}
