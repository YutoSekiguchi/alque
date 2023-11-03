"use client";

import { userAtom } from '@/jotai/user';
import { getUserByMail } from '@/services/user';
import { useAtom } from 'jotai';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';

const UserButton: () => JSX.Element = () => {
  const { data: session } = useSession();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const getUserData = async() => {
      if (session && session.user?.email !== null && session.user && session.user.email) {
        const res = await getUserByMail(session.user.email);
        if (res === null || user !== null) {
          return;
        }
        setUser(res);
      }
    }
    getUserData();
  }, [session?.user])

  return(
    <>
    {
        // セッションがある場合、ログアウトを表示
        session && session.user?.image !== null && session.user && session.user.image? 
          <div>
            <Image
              src={session.user?.image}
              alt={"ユーザ画像"}
              width={40}
              height={40}
              className='rounded-full cursor-pointer mx-auto'
            />
            {/* <button onClick={() => signOut()}>ログアウト</button> */}
          </div>
        :
        <div>
          <button onClick={() => signIn()} className='border-2 rounded-md text-xs px-2 py-2'>login</button>
        </div>
      }
    </>
  );
}

export default UserButton;