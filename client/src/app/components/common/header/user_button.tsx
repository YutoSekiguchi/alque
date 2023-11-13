"use client";

import { userAtom } from '@/jotai/user';
import { getUserByMail } from '@/services/user';
import { useAtom } from 'jotai';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MaterialSymbolsLogout } from '../../icons/logout';
import { useRouter } from 'next/navigation';

const UserButton: () => JSX.Element = () => {
  const { data: session } = useSession();
  const [user, setUser] = useAtom(userAtom);

  const [openNavbar, setOpenNavbar] = useState<boolean>(false);
  const router = useRouter();

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

  const handleClickUserButton = () => {
    setOpenNavbar(!openNavbar);
  }

  // signoutして"/"に戻る
  const logout = async () => {
    await signOut();
    location.href = "/";
  }

  return(
    <>
    {
        // セッションがある場合、ログアウトを表示
        session && session.user?.image !== null && session.user && session.user.image? 
          <div className='relative'>
            <Image
              src={session.user?.image}
              alt={"ユーザ画像"}
              width={40}
              height={40}
              className='rounded-full cursor-pointer mx-auto'
              onClick={() => handleClickUserButton()}
            />
            {openNavbar && (
              <div className='absolute bottom-0 w-40 mb-12 py-2 dark:bg-gray-700 bg-gray-50 border rounded shadow-xl'>
                <button onClick={logout} className='px-4 py-2 text-sm w-full capitalize hover:dark:bg-gray-600 hover:bg-gray-200 flex items-center'>
                  <MaterialSymbolsLogout className='mr-3' />
                  ログアウト
                </button>
              </div>
            )}
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