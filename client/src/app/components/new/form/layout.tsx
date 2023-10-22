import { useEffect, useState } from "react";
import SubmitButton from "../../common/form/submit_button/layout";
import TextArea from "../../common/form/text_area/layout";
import TextInput from "../../common/form/text_input/layout";
import { PostQuestionDataType } from "@/@types/question";
import { useAtom } from "jotai";
import { userAtom } from "@/jotai/user";
import { getTeamByID, getTeamsByUID } from "@/services/team";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import SelectInput from "../../common/form/select_input/layout";
import StarsLayout from "../../common/article/stars/layout";
import { getNowDate } from "@/modules/get_date";
import { postQuestion } from "@/services/question";
import AutoDialog from "../../common/auto_dialog/layout";

interface Props {
  handleChangeQuestionImageURL: (newValue: string) => void;
  handleChangeAnswerImageURL: (newValue: string) => void;
  handleChangeQuestionContext: (newValue: string) => void;
  handleChangeQuestionComment: (newValue: string) => void;
  handleChangeSelectTeamID: (newValue: number) => void;
  handleChangeMyTeams: (newValue: TeamDataWithoutPasswordType[]) => void;
  handleChangeSelectTeam: (newValue: TeamDataWithoutPasswordType | null) => void;
  handleChangeAnswerContext: (newValue: string) => void;
  handleChangeQuestionLevel: (newValue: number) => void;
  questionImageURL: string;
  answerImageURL: string;
  questionContext: string;
  questionComment: string;
  selectTeamID: number;
  myTeams: TeamDataWithoutPasswordType[];
  answerContext: string;
  questionLevel: number;
}

const NewForm: (props: Props) => JSX.Element = (props: Props) => {
  const { handleChangeQuestionImageURL, handleChangeAnswerImageURL, handleChangeQuestionContext, handleChangeQuestionComment, handleChangeSelectTeamID, handleChangeMyTeams, handleChangeAnswerContext, handleChangeQuestionLevel, handleChangeSelectTeam, questionImageURL, answerImageURL, questionContext, questionComment, selectTeamID, myTeams, answerContext, questionLevel } = props;
  const [user, ] = useAtom(userAtom);
  const [isShowCompleteDialog, setIsShowCompleteDialog] = useState<boolean>(false);

  const handleSubmit = async() => {
    if (user === null) {
      alert("ログインしてください");
      return;
    }
    if (questionImageURL === "") {
      alert("問題画像URLを入力してください");
      return;
    } else if (answerImageURL === "") {
      alert("解答画像URLを入力してください");
      return;
    } else if (questionContext === "") {
      alert("問題文を入力してください");
      return;
    } else if (answerContext === "") {
      alert("解答発表時の文章を入力してください");
      return;
    }
    // imageURLがURLかどうかのチェック
    const urlRegex = new RegExp(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/);
    if (!urlRegex.test(questionImageURL)) {
      alert("問題画像URLがURLではありません");
      return;
    } else if (!urlRegex.test(answerImageURL)) {
      alert("解答画像URLがURLではありません");
      return;
    }
    
    const postQuestionData: PostQuestionDataType = {
      UID: user.ID,
      TID: selectTeamID,
      QuestionImageUrl: questionImageURL,
      AnswerImageUrl: answerImageURL,
      QuestionLevel: questionLevel,
      QuestionSentence: questionContext,
      AnswerSentence: answerContext,
      Comment: questionComment,
      Hint: "",
      Date: getNowDate(),
    };

    const res = await postQuestion(postQuestionData, user.Mail);
    if (res === null) {
      alert("投稿に失敗しました");
      return;
    }
    setIsShowCompleteDialog(true);
    handleChangeQuestionImageURL("");
    handleChangeAnswerImageURL("");
    handleChangeQuestionContext("");
    handleChangeQuestionComment("");
    handleChangeAnswerContext("");
    handleChangeQuestionLevel(0);
  };

  // myteamsをoptionsの型に合わせる
  const myTeamsOptions = myTeams.map((team) => {
    return {
      value: team.ID,
      label: team.Name,
    }
  });

  // teamの取得
  useEffect(() => {
    const getMyTeams = async () => {
      if (user === null) {
        return;
      }
      const res = await getTeamsByUID(user.ID);
      if (res === null) {
        return;
      }
      handleChangeMyTeams(res);
    }
    getMyTeams();
  }
  , [user]);

  useEffect(() => {
    if (selectTeamID === 0) {
      handleChangeSelectTeam({ ID: 0, Name: "", Detail: "", Image: "", CreatedAt: "" });
      return;
    }
    const getSelectedTeam = async () => {
      const res = await getTeamByID(selectTeamID);
      if (res === undefined || res === null) {
        alert("グループが見つかりませんでした");
        return;
      }
      handleChangeSelectTeam(res);
    };
    getSelectedTeam();
  }, [selectTeamID])

  return (
    <>
      {
        isShowCompleteDialog &&
        <AutoDialog
          text={"投稿しました"}
          setIsShow={setIsShowCompleteDialog}
        />
      }
      <div className="mt-12">
        <SelectInput
          label="Group"
          value={selectTeamID}
          handleChangeValue={handleChangeSelectTeamID}
          options={[...myTeamsOptions, {label: "全て", value: 0}]}
        />
      </div>
      <div className="mt-6">
        <TextInput
          label="問題画像URL"
          placeHolder="Questions' Image URL"
          handleChangeValue={handleChangeQuestionImageURL}
        />
      </div>
      <div className="mt-6">
        <TextInput
          label="解答画像URL"
          placeHolder="Answers' Image URL"
          handleChangeValue={handleChangeAnswerImageURL}
        />
      </div>
      <div className="mt-6">
        <TextArea
          label="問題文"
          placeHolder="Who is the man in this image?"
          handleChangeValue={handleChangeQuestionContext}
        />
      </div>
      <div className="mt-6">
        <TextArea
          label="回答発表時の文章"
          placeHolder="This image is my favorite image."
          handleChangeValue={handleChangeAnswerContext}
        />
      </div>
      {/* <div className="mt-6">
        <TextArea
          label="コメント"
          placeHolder="This image is my favorite image."
          handleChangeValue={handleChangeQuestionComment}
        />
      </div> */}
      <div className="mt-4">
        <p className="text-sm">難易度</p>
        <StarsLayout
          handleChangeQuestionLevel={handleChangeQuestionLevel}
          questionLevel={questionLevel}
        />
      </div>
      <div className="mt-6 ml-auto" onClick={handleSubmit}>
        <SubmitButton
          label="投稿する"
        />
      </div>
    </>
  );
}

export default NewForm;