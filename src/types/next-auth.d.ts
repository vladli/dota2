import { DefaultUser } from "next-auth";

export enum Role {
  user = "user",
  admin = "admin",
}
interface IUser extends DefaultUser {
  steamId?: string;
  steam?: {
    avatar: string;
    avatarfull: string;
    avatarhash: string;
    avatarmedium: string;
    commentpermission: number;
    communityvisibilitystate: number;
    lastlogoff: number;
    loccountrycode: string;
    personaname: string;
    personastate: number;
    personastateflags: number;
    primaryclanid: string;
    profilestate: number;
    profileurl: string;
    steamid: string;
    timecreated: number;
  };
}
declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
