"use client";

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

const UserButton: () => JSX.Element = () => {
  const { data: session } = useSession();
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