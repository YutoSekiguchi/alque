import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google';
import { PostUserDataType } from '../../../../../@types/user';
import { signin } from '@/services/user';

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
        name: profile.name!,
        displayName: profile.name!,
        mail: profile.email!,
        image: params.user.image!,
        dark: 0,
      }
      console.log(data);
      const userData = await signin(data);
      // TODO: imageが違う場合の処理も記述
      if(userData === null || userData === undefined) {
        return Promise.resolve(false);
      }
      return Promise.resolve(true);
    },
  }

}