import { PostMemberDataType } from "@/@types/member";
import TextInput from "@/app/components/common/form/text_input/layout";
import { userAtom } from "@/jotai/user";
import { getMembersByUID, postMember } from "@/services/member";
import { getTeamByIDAndPassword } from "@/services/team";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setIsShowDialog: Dispatch<SetStateAction<boolean>>;
  setIsShowCompleteDialog: Dispatch<SetStateAction<boolean>>;
  tid: number;
}

export const PasswordFormDialog: (props:Props) => JSX.Element = (props: Props) => {
  const { setIsShowDialog, setIsShowCompleteDialog, tid } = props;
  const [groupPassword, setGroupPassword] = useState<string>("");
  const [user, ] = useAtom(userAtom);

  const handleChangeGroupPassword = (newValue: string) => {
    setGroupPassword(newValue);
  };

  const resetState = () => {
    setIsShowDialog(false);
    setGroupPassword("");
  };

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };

  const handleSubmit = async() => {
    if (user === undefined || user === null) {
      alert("ログインしてください");
      return;
    }
    const res = await getTeamByIDAndPassword(tid, groupPassword);
    if (res === undefined || res === null) {
      alert("パスワードが間違っています");
      return;
    }
    const getMemberRes = await getMembersByUID(user.ID);
    for (const member of getMemberRes) {
      if (member.TID === tid) {
        alert("すでに参加しています");
        return;
      }
    }
    const postMemberData: PostMemberDataType = {
      TID: tid,
      UID: user.ID,
    }
    const postMemberRes = await postMember(postMemberData);
    if (postMemberRes === undefined || postMemberRes === null) {
      alert("グループに参加できませんでした");
      return
    }
    setIsShowCompleteDialog(true);
    resetState();
  };


  return(
    <div className="fixed top-0 left-0 w-full h-full dialog-background"
    id="exampleModal">
      <div className="dialog p-6 rounded-xl m-16 mx-auto w-2/4">
        <h1 className="text-xl font-bold mb-4">グループに参加</h1>
        <div className="mb-4">
          <TextInput
            label="パスワード*"
            placeHolder="Group Password"
            handleChangeValue={handleChangeGroupPassword}
          />
        </div>
        <div className="flex justify-around">
          <button
            onClick={handleCloseDialog}
            className="px-4 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            閉じる
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-400 text-white px-6 py-2 rounded-full hover:bg-blue-300"
          >
            参加
          </button>
        </div>
      </div>
    </div>
  );
};
