"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: any;
};
export default function Providers({ children, session }: Props) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}
