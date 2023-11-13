"use client";

import { userAtom } from "@/jotai/user";
import { useAtom } from "jotai";
import SubmitButton from "./components/common/form/submit_button/layout";
import { useRouter } from "next/navigation";

export default function App() {
  const [user, ] = useAtom(userAtom);
  const router = useRouter();

  // /homeへ移動
  const handleStart = () => {
    router.push("/home");
  }

  const handleLoginPage = () => {
    router.push("/api/auth/signin")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="text-xl font-bold text-center mb-2">
          ようこそ
        </div>
        {
          user?
          <>
            <div className="text-2xl font-bold text-center">
              {user.Name}さん
            </div>
            <div className="mt-4" onClick={handleStart}>
              <SubmitButton label={"今すぐ始める"} />
            </div>
          </>
          :
          <div className="mt-4" onClick={handleLoginPage}>
              <SubmitButton label={"ログインして始める"} />
            </div>
        }
      </div>
    </main>
  )
}
