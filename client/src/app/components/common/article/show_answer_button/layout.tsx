import { AnswerDataType } from "@/@types/answer";
import { useState } from "react";
import ShowAnswerDialog from "../show_answer_dialog/layout";

interface ShowAnswerButtonProps {
  text: string;
  color: string;
  articleAnswerData: AnswerDataType[];
  answerImageUrl: string;
  questionID: number;
}

const ShowAnswerButton = (props: ShowAnswerButtonProps) => {
  const { text, color, articleAnswerData, answerImageUrl, questionID } = props;

  const [isShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  const handleClickShowAnswerButton = () => {
    setIsShowAnswer(true);
  }

  const handleCloseShowAnswer = () => {
    setIsShowAnswer(false);
  }

  return (
    <>
      {
        isShowAnswer &&
        <ShowAnswerDialog handleCloseShowAnswer={handleCloseShowAnswer} articleAnswerData={articleAnswerData} answerImageUrl={answerImageUrl} questionID={questionID} />
      }
        <button 
          className={`px-3 py-2 rounded-lg text-sm  cursor-pointer ${color} dark:bg-gray-800 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200`}
          onClick={handleClickShowAnswerButton}
        >
          {text}
        </button>
    </>
  );
}

export default ShowAnswerButton;
