"use client";

import { userAtom } from "@/jotai/user";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const ChangeTheme = () => {

  const [user, ] = useAtom(userAtom);
  const [selectThemeIndex, setSelectThemeIndex] = useState<number | null>(null);

  useEffect(() => {
    if(user){
      setSelectThemeIndex(user.Dark);
    }
  }
  , [user]);

  return(
    <div>
      <div className="pt-6 pl-4 text-lg font-bold">
        テーマの変更
      </div>

      <div className="flex">
        <div className="card border border-gray-200 rounded-lg shadow dark:border-gray-700 theme-white px-6 py-4 flex items-center">
          <div className="check_button w-[1.3rem] h-[1.3rem] border border-gray-800 rounded-full mr-4">
          </div>
          <div className="font-bold">
            ホワイト
          </div>
        </div>

      </div>
    </div>
  );
}

export default ChangeTheme;