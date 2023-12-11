import { getServerSession } from "next-auth";

import Header from "@/components/Layout/Header";

import Providers from "../providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <Providers session={session}>
      <Header />
      <main>{children}</main>
    </Providers>
  );
}
