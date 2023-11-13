import { UserDataType } from "@/@types/user";
import SubmitButton from "../../form/submit_button/layout";
import QuestionCard from "../layout";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import ModalImageLayout from "../../modal_image/layout";
import { useState } from "react";
import TextInput from "../../form/text_input/layout";
import { getMatchAnswer } from "@/modules/get_match_answer";
import { postAnswer } from "@/services/answer";
import { PostAnswerDataType } from "@/@types/answer";
import LoadingDialogLayout from "../../loading_dialog/layout";
import CorrectDialog from "./correct_dialog";

interface AnswerDialogLayoutProps {
  user: UserDataType;
  group: TeamDataWithoutPasswordType;
  questionID: number;
  questionImageUrl: string;
  answerImageUrl: string;
  questionContext: string;
  questionComment?: string;
  questionHint?: string;
  questionLevel: number;
  questionDate: string;
  closeShowAnswerDialog: () => void;
}

const AnswerDialogLayout = (props: AnswerDialogLayoutProps) => {
  const { user, group, questionID, questionImageUrl, answerImageUrl, questionContext, questionComment, questionHint, questionLevel, questionDate, closeShowAnswerDialog } = props;

  const urlRegex = new RegExp(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/);

  const [predictImageUrl, setPredictImageUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCorretAnswer, setIsCorrectAnswer] = useState<number>(-1);

  const handleChangePredictImageUrl = (newValue: string) => {
    setPredictImageUrl(newValue);
  }

  const handleSubmitAnswer = async() => {
    // 提出中はボタンを押せないようにする
    setIsSubmitting(true);

    if (!urlRegex.test(predictImageUrl)) {
      alert("予想画像URLが不正です");
      setIsSubmitting(false);
      return;
    }

    const isMatch: number = getMatchAnswer(answerImageUrl, predictImageUrl);

    // 予想画像URLを送信
    try {
    const postAnswerData: PostAnswerDataType = {
      QID: questionID,
      UID: user.ID,
      PredImageUrl: predictImageUrl,
      MatchAnswer: isMatch,
      QuestionLevel: questionLevel,
    }
    const postAnswerRes = await postAnswer(postAnswerData, user.Mail);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsCorrectAnswer(isMatch);
      isMatch === 1 && closeShowAnswerDialog();
    }, 3000);
    } catch(e) {
      alert("予想画像URLの送信に失敗しました");
      setIsSubmitting(false);
    }
  }

  const handleCloseDialog = () => {
    if (isCorretAnswer === 1) {
      closeShowAnswerDialog();
    }
    handleChangePredictImageUrl("");
    setIsCorrectAnswer(-1);
  };

  return(
    <>
    {isSubmitting && <LoadingDialogLayout />}
    {isCorretAnswer >= 0 && 
      <CorrectDialog
        handleCloseDialog={handleCloseDialog}
        correct={isCorretAnswer===1? true: false}
      />
    }
    <div
      className="fixed top-0 left-0 w-full h-full dialog-background z-50 overflow-scroll"
      id="exampleModal"
    >
      <div className="dialog p-6 rounded-xl my-12 mx-auto w-[90%]">
        <div className="flex">
          <div className="w-[55%]">
              <QuestionCard
                user={user}
                group={group}
                questionID={questionID}
                questionImageUrl={questionImageUrl}
                answerImageUrl={answerImageUrl}
                questionContext={questionContext}
                questionComment={questionComment}
                questionHint={questionHint}
                questionLevel={questionLevel}
                questionDate={questionDate}
                type="demo"
              />
          </div>
          <div className="w-[40%] mx-auto mt-2">
            <div>
            <div className="mt-2 mb-1">解答予想画像URL</div>
              <TextInput
                label=""
                placeHolder="https://..."
                handleChangeValue={handleChangePredictImageUrl}
              />
            </div>
            {predictImageUrl!==""&&
            <>
              <div className="mt-2 text-sm mb-1">あなたの予想画像</div>
              <div className="flex items-center justify-center">
                <ModalImageLayout
                  imageURL={predictImageUrl}
                  alt="解答予想画像"
                />
              </div>
            </>
            }
          </div>
        </div>
        <div className="flex items-center justify-around mt-6">
          <div onClick={closeShowAnswerDialog}>
            <button className={` border hover:bg-gray-100 dark:hover:bg-gray-700 px-10 py-3 rounded-md`}>
              閉じる
            </button>
          </div>
          <div onClick={handleSubmitAnswer}>
            <SubmitButton label="回答を提出" disabled={isSubmitting} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AnswerDialogLayout;