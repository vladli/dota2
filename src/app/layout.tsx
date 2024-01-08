import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Dota 2 Stats",
    default: "Dota 2 Stats",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className="subpixel-antialiased dark"
      lang="en"
    >
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
