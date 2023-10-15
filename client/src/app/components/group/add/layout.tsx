"use client";

import { useState } from "react";
import ShowAddDialogButton from "./show_add_dialog_button/layout";
import GroupAddDialog from "./dialog/layout";
import AutoDialog from "../../common/auto_dialog/layout";

const AddGroup: () => JSX.Element = () => {
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState<boolean>(false);

  const handleShowDialog = () => {
    setIsShowDialog(true);
  }

  return (
    <div>
      <div onClick={handleShowDialog}>
        <ShowAddDialogButton />
      </div>
      {
        isShowDialog&&
        <GroupAddDialog setIsShowDialog={setIsShowDialog} setIsShowCompleteDialog={setIsShowCompleteDialog} />
      }
      {
        isShowCompleteDialog&&
        <AutoDialog text={"グループを作成しました"} setIsShow={setIsShowCompleteDialog} />
      }
    </div>
  );
}

export default AddGroup;