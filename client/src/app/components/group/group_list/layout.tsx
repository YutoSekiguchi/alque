import { TeamDataWithoutPasswordType } from "@/@types/team";
import { useEffect, useState } from "react";
import { PasswordFormDialog } from "../search/password_form_dialog/layout";
import AutoDialog from "../../common/auto_dialog/layout";
import { getMembersByUID } from "@/services/member";
import { useAtom } from "jotai";
import { userAtom } from "@/jotai/user";

interface Props {
  groups: TeamDataWithoutPasswordType[];
  type: "search" | "yours";
}

const GroupListLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { groups, type } = props;

  const [user, ] = useAtom(userAtom);

  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState<boolean>(false);
  const [tid, setTID] = useState<number>(0);
  const [applyGroups, setApplyGroups] = useState<number[]>([]);


  const handleClickGroup = (group: TeamDataWithoutPasswordType) => {
    switch (type) {
      case "search":
        setTID(group.ID);
        setIsShowDialog(true);
        break;
      case "yours":
        // TODO: グループページに遷移
        break;
      default:
        return
    }
  }

  useEffect(() => {
    const getApplyGroups = async () => {
      if (user === undefined || user === null) {
        return;
      }
      const getMemberRes = await getMembersByUID(user.ID);
      const tmp: number[] = [];
      for (const member of getMemberRes) {
        tmp.push(member.TID);
      }
      setApplyGroups(tmp);
    };
    getApplyGroups();
  }, [user]);

  return (
    <div className="group-list">
      {
        isShowCompleteDialog&&
        <AutoDialog text={"グループに加入しました"} setIsShow={setIsShowCompleteDialog} />
      }
      {
        isShowDialog&&
        <PasswordFormDialog setIsShowDialog={setIsShowDialog} setIsShowCompleteDialog={setIsShowCompleteDialog} tid={tid} />
      }
      {
        type === "search"&&
        <h2>検索結果: {groups.length}件</h2>
      }
      {
        type === "yours"&&
        <h2>所属グループ一覧:</h2>
      }
      {
        groups.map((group, index) => {
          return (
            <div key={index}>
              { (type === "yours" && !applyGroups.includes(group.ID))?
              <></>
              :
              <div className="group-list-element flex items-center py-2 px-4 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 border-gray-300 border-2 mt-2 cursor-pointer h-16 w-full" onClick={() => handleClickGroup(group)}>
                <div className="group-list-image mr-2">
                  <img src={group.Image===""? "/no-group-img.png": group.Image} alt="グループ画像" className="max-w-[30px] max-h-[30px]" />
                </div>
                <div className="group-list-detail flex items-center">
                  <div className="group-list-name text-md font-bold overflow-x-hidden truncate whitespace-nowrap">
                    {group.Name}
                  </div>
                  <div className="group-list-description truncate overflow-x-hidden whitespace-nowrap text-gray-400">
                    {group.Detail}
                  </div>
                </div>
                <div className="ml-auto pl-2 group-list-apply text-xs sm:text-sm text-end">
                  {applyGroups.includes(group.ID)? "参加済み": ""}
                </div>
              </div>
              }
            </div>
          );
        })
      }
    </div>
  );
}

export default GroupListLayout;