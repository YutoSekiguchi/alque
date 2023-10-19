import { useState } from "react";
import ModalImageLayout from "../modal_image/layout";

interface AnswerArticleProps {
  answerImageUrl: string;
  answerContext: string;
  questionDate: string;
}

const AnswerArticleCard: (props: AnswerArticleProps) => JSX.Element = (props: AnswerArticleProps) => {
  const { answerImageUrl, answerContext, questionDate } = props;

  const MAX_CONTEXT_LENGTH = 130;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayQuestionContext = isExpanded? answerContext: answerContext.length > MAX_CONTEXT_LENGTH? answerContext.slice(0, MAX_CONTEXT_LENGTH) + "...": answerContext;

  // さらに表示ボタンを押したときの処理
  const handleClickExpandedButton = () => {
    setIsExpanded(true);
  }

  return (
    <div className="w-full flex">
      {answerImageUrl!=="" &&
      <>
      <div className="group-question-card__user-image w-[40px] mr-3"></div>
      <div className="group-answer-card w-full">
        <div className="group-answer-card__header flex items-center mb-3">
          <div className="group-question-card__header__user-name text-sm font-semibold">
          {questionDate}の答え
          </div>
        </div>
        <div className="group-answer-card__body max-w-[99%]">
          <div className="group-answer-card__body__question-context text-sm whitespace-pre-wrap">
            {answerContext}
          </div>
          {
            !isExpanded && displayQuestionContext.length > MAX_CONTEXT_LENGTH && (
            <div className="group-answer-card__body__expandedButton text-blue-500 text-sm cursor-pointer" onClick={handleClickExpandedButton}>
              さらに表示
            </div>
            )
          }
          <div className="group-answer-card__body__question-image max-w-[99%] mt-4 mb-1">
            <ModalImageLayout imageURL={answerImageUrl} alt={"回答画像"} />
          </div>
        </div>
      </div>
      </>
      }
    </div>
  );
}

export default AnswerArticleCard;