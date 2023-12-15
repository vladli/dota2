import { getServerSession } from "next-auth";

import Header from "@/components/Layout/Header";

import { getAuthOptions } from "../api/auth/[...nextauth]/route";
import Providers from "../providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(getAuthOptions());
  return (
    <Providers session={session}>
      <Header />
      <main>{children}</main>
    </Providers>
  );
}
