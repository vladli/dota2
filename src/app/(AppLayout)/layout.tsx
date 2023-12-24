import { Toaster } from "react-hot-toast";
import { getServerSession } from "next-auth";

import Header from "@/components/Layout/Header";
import { getAuthOptions } from "@/lib/authOptions";

import Providers from "../providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(getAuthOptions());
  return (
    <Providers session={session}>
      <Toaster
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#ECEDEE",
          },

          duration: 4000,
        }}
      />
      <Header />
      <main>{children}</main>
    </Providers>
  );
}
