import { TeamDataWithoutPasswordType } from "@/@types/team";
import { UserDataType } from "@/@types/user";
import { useState } from "react";
import StarsLayout from "./stars/layout";
import ModalImageLayout from "../modal_image/layout";
import MoveAnswerPageButton from "./move_answer_page_button/layout";

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
  type: "demo" | "prod";
}

const QuestionCard: (props: Props) => JSX.Element = (props: Props) => {
  const { user, group, questionID, questionImageUrl, answerImageUrl, questionDate, questionContext, questionComment, questionHint, type, questionLevel } = props;

  const MAX_CONTEXT_LENGTH = 130;

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const displayQuestionContext = isExpanded? questionContext: questionContext.length > MAX_CONTEXT_LENGTH? questionContext.slice(0, MAX_CONTEXT_LENGTH) + "...": questionContext;

  // さらに表示ボタンを押したときの処理
  const handleClickExpandedButton = () => {
    setIsExpanded(true);
  }

  return(
    <div>
      <div className="group-question-card flex w-full border-bottom pl-3 pr-4 py-3">
        <div className="group-question-card__user-image w-[40px] mr-3">
          {
            (user !== null && user.Image !== null) &&
            <img src={user.Image} alt="ユーザ画像" className="rounded-full" />
          }
        </div>
        <div className="w-full">
        <div className="group-question-card__header flex items-center mb-3">
          <div className="group-question-card__header__user-name text-sm font-semibold">
            {user.Name}
          </div>
          <div className="group-question-card__header__date ml-auto text-end text-gray-600 dark:text-gray-400 text-sm">
            {questionDate}
          </div>
        </div>
        <div className="group-question-card__body max-w-[99%]">
          <div className="group-question-card__body__question-context whitespace-pre-wrap">
            {displayQuestionContext}
          </div>
          {
            !isExpanded && displayQuestionContext.length > MAX_CONTEXT_LENGTH && (
            <div className="group-question-card__body__expandedButton text-blue-500 text-sm cursor-pointer" onClick={handleClickExpandedButton}>
              さらに表示
            </div>
            )
          }
          <div className="group-question-card__body__question-image w-[99%] mt-4 mb-1 bg-black rounded-xl">
            {questionImageUrl!=="" &&
              <ModalImageLayout
                imageURL={questionImageUrl}
                alt={"問題画像"}
              />
            }
          </div>
          {
            questionComment &&
            <div className="group-question-card__body__question-comment text-sm">
              {questionComment}
            </div>
          }
          {
            questionHint &&
            <div className="group-question-card__body__question-hint">
              {questionHint}
            </div>
          }
          <div className="group-question-card__body__group flex items-center justify-between mt-1 mb-2">
            <div className="flex items-center">
              <div className="mr-2 flex items-center">
                <div className="group-question-card__body__group__name text-xs mr-1 text-gray-600 dark:text-gray-400">
                  @{group && group.ID != 0 ?group.Name: "全体"}
                </div>
                <img src={group && group.ID != 0 ?group.Image === ""? "/no-group-img.png": group.Image: "/all.jpg"} alt="グループ画像" className="w-[14px] h-[14px] rounded-full" />
              </div>
              <p className="text-xs">難易度</p>
              <StarsLayout
                questionLevel={questionLevel}
                size={4}
              />
            </div>
          </div>
          {
            type === "prod" &&  
            <div>
              <MoveAnswerPageButton 
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
              />
            </div>
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;