import { NextApiRequest, NextApiResponse } from "next/types";
import NextAuth from "next-auth/next";

import { getAuthOptions } from "@/lib/authOptions";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, getAuthOptions(req));
};

export { handler as GET, handler as POST };
