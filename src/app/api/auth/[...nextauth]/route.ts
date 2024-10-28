import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";

import { getAuthOptions } from "@/lib/authOptions";

async function handler(req: NextRequest, res: NextResponse) {
  //@ts-ignore
  //asd
  return NextAuth(req, res, getAuthOptions(req));
}

export { handler as GET, handler as POST };
