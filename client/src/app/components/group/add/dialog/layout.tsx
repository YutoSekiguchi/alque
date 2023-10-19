import TextArea from "@/app/components/common/form/text_area/layout";
import TextInput from "@/app/components/common/form/text_input/layout";
import { Dispatch, SetStateAction, useState } from "react";
import { PostTeamDataType, TeamDataType } from "@/@types/team";
import { postTeam } from "@/services/team";
import { PostMemberDataType } from "@/@types/member";
import { useAtom } from "jotai";
import { userAtom } from "@/jotai/user";
import { postMember } from "@/services/member";

interface Props {
  setIsShowDialog: Dispatch<SetStateAction<boolean>>;
  setIsShowCompleteDialog: Dispatch<SetStateAction<boolean>>;
}

const GroupAddDialog: (props: Props) => JSX.Element = (props: Props) => {
  const { setIsShowDialog, setIsShowCompleteDialog } = props;

  const [user, ] = useAtom(userAtom);

  const [groupName, setGroupName] = useState<string>("");
  const [groupPassword, setGroupPassword] = useState<string>("");
  const [groupDetail, setGroupDetail] = useState<string>("");
  const [groupImageURL, setGroupImageURL] = useState<string>("");

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  };
  const handleChangeGroupName = (newValue: string) => {
    setGroupName(newValue);
  };
  const handleChangeGroupPassword = (newValue: string) => {
    setGroupPassword(newValue);
  };
  const handleChangeGroupDetail = (newValue: string) => {
    setGroupDetail(newValue);
  };
  const handleChangeGroupImageURL = (newValue: string) => {
    setGroupImageURL(newValue);
  };

  const resetState = () => {
    setIsShowDialog(false);
    setGroupName("");
    setGroupPassword("");
    setGroupDetail("");
    setGroupImageURL("");
  };

  const handleSubmit = async () => {
    if (user === null) {
      alert("ログインして下さい");
      return;
    }
    if (groupName === "") {
      alert("グループ名を入力して下さい");
      return;
    } else if (groupPassword.length <= 7) {
      alert("グループのパスワードは8文字以上で入力して下さい");
      return;
    }
    // dataに入力値を格納
    const teamData: PostTeamDataType = {
      Name: groupName,
      Password: groupPassword,
      Detail: groupDetail,
      Image: groupImageURL,
    };
    // APIを叩く
    try {
      const teamRes: TeamDataType = await postTeam(teamData);
      if (teamRes === null) {
        alert("グループ作成に失敗しました");
        return;
      }
      // memberDataの作成
      const memberData: PostMemberDataType = {
        TID: teamRes.ID,
        UID: user.ID,
      };
      await postMember(memberData);
    } catch (e) {
      alert("グループ作成に失敗しました");
      return;
    }
    setIsShowCompleteDialog(true);
    resetState();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full dialog-background z-50"
      id="exampleModal"
    >
      <div className="dialog p-6 rounded-xl m-16 mx-auto w-2/4">
        <h1 className="text-xl font-bold mb-4">グループ作成</h1>
        <div className="mb-4">
          <TextInput
            label="グループ名*"
            placeHolder="Group Name"
            handleChangeValue={handleChangeGroupName}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="パスワード*"
            placeHolder="Group Password"
            handleChangeValue={handleChangeGroupPassword}
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="サムネイル URL"
            placeHolder="Group Image URL"
            handleChangeValue={handleChangeGroupImageURL}
          />
        </div>
        <div className="mb-4">
          <TextArea
            label="説明"
            placeHolder="Group Description"
            handleChangeValue={handleChangeGroupDetail}
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
            作成
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupAddDialog;
