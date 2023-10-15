import TextArea from "@/app/components/common/form/text_area/layout";
import TextInput from "@/app/components/common/form/text_input/layout";
import { Dispatch, SetStateAction, useState } from "react";

interface Props {
  setIsShowDialog: Dispatch<SetStateAction<boolean>>;
}

const GroupAddDialog: (props: Props) => JSX.Element = (props: Props) => {
  const { setIsShowDialog } = props;

  const [groupName, setGroupName] = useState<string>("");
  const [groupPassword, setGroupPassword] = useState<string>("");
  const [groupDetail, setGroupDetail] = useState<string>("");
  const [groupImageURL, setGroupImageURL] = useState<string>("");

  const handleCloseDialog = () => {
    setIsShowDialog(false);
  }
  const handleChangeGroupName = (newValue: string) => {
    setGroupName(newValue);
  }
  const handleChangeGroupPassword = (newValue: string) => {
    setGroupPassword(newValue);
  }
  const handleChangeGroupDetail = (newValue: string) => {
    setGroupDetail(newValue);
  }
  const handleChangeGroupImageURL = (newValue: string) => {
    setGroupImageURL(newValue);
  }

  return(
    <div
      className="fixed top-0 left-0 w-full h-full dialog-background"
      id="exampleModal">
        <div className="dialog p-6 rounded-xl m-16 mx-auto w-2/4">
            <h1 className="text-xl font-bold mb-4">グループ作成</h1>
            <div className="mb-4">
              <TextInput label="グループ名*" placeHolder="Group Name" handleChangeValue={handleChangeGroupName} />
            </div>
            <div className="mb-4">
              <TextInput label="パスワード*" placeHolder="Group Password" handleChangeValue={handleChangeGroupPassword} />
            </div>
            <div className="mb-4">
              <TextInput label="サムネイル URL" placeHolder="Group Image URL" handleChangeValue={handleChangeGroupImageURL} />
            </div>
            <div className="mb-4">
              <TextArea label="説明" placeHolder="Group Description" handleChangeValue={handleChangeGroupDetail} />
            </div>
            <div className="flex justify-around">
              <button onClick={handleCloseDialog} className="px-4 py-2 rounded-full border hover:bg-gray-100 dark:hover:bg-gray-700">閉じる</button>
              <button onClick={handleCloseDialog} className="bg-blue-400 text-white px-6 py-2 rounded-full border hover:bg-blue-300">作成</button>
            </div>
        </div>
    </div>
  );
}

export default GroupAddDialog