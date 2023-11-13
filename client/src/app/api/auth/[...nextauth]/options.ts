import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PostUserDataType } from "@/@types/user";
import { signin } from "@/services/user";

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(params) {
      const profile = params.profile;
      if (profile === undefined) {
        return Promise.resolve(false);
      }
      const data: PostUserDataType = {
        Name: profile.name!,
        DisplayName: profile.name!,
        Mail: profile.email!,
        Image: params.user.image!,
        Dark: 0, // 1: dark, 0: auto, -1: light
      };
      const userData = await signin(data);
      // TODO: imageが違う場合の処理も記述
      if (userData === null || userData === undefined) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    },
  },
};
