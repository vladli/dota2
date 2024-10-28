import { NextRequest } from "next/server";
import NextAuth from "next-auth";

import { getAuthOptions } from "@/lib/authOptions";

async function handler(req: NextRequest) {
  //@ts-ignore
  return NextAuth(req, undefined, getAuthOptions(req));
}

export { handler as GET, handler as POST };
