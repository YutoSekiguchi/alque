import { useState } from "react";
import SubmitButton from "../../form/submit_button/layout";
import AnswerDialogLayout from "../answer_dialog/layout";
import { UserDataType } from "@/@types/user";
import { TeamDataWithoutPasswordType } from "@/@types/team";

interface Props {
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
}

const MoveAnswerPageButton: (props: Props) => JSX.Element = (props: Props) => {
  const { user, group, questionID, questionImageUrl, answerImageUrl, questionContext, questionComment, questionHint, questionLevel, questionDate } = props;
  const [isShowAnswerDialog, setIsShowAnswerDialog] = useState<boolean>(false);

  const handleMoveAnswerPage = () => {
    setIsShowAnswerDialog(true);
  }

  const handleCloseAnswerDialog = () => {
    setIsShowAnswerDialog(false);
  }

  return (
    <>
      {
        isShowAnswerDialog &&
        <AnswerDialogLayout
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
          closeShowAnswerDialog={handleCloseAnswerDialog}
        />
      }
      <div onClick={handleMoveAnswerPage}>
        <SubmitButton label={"解答する"} px={5} py={2} />
      </div>
    </>
  );
}

export default MoveAnswerPageButton;