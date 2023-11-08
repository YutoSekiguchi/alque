import { TeamDataWithoutPasswordType } from "@/@types/team";
import { UserDataType } from "@/@types/user";
import { useEffect, useState } from "react";
import StarsLayout from "./stars/layout";
import ModalImageLayout from "../modal_image/layout";
import MoveAnswerPageButton from "./move_answer_page_button/layout";
import { myAnswerAtom } from "@/jotai/my_answer";
import { useAtom } from "jotai";
import { AnswerDataType } from "@/@types/answer";
import { checkDate } from "@/modules/check_date";
import ShowAnswerButton from "./show_answer_button/layout";
import { HeroiconsOutlineChatBubbleOvalLeftEllipsis } from "../../icons/chat";
import Link from "next/link";

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
  reactionCount?: number;
  type: "demo" | "prod" | "detail";
}

const QuestionCard: (props: Props) => JSX.Element = (props: Props) => {
  const { user, group, questionID, questionImageUrl, answerImageUrl, questionDate, questionContext, questionComment, questionHint, type, questionLevel, reactionCount } = props;

  const MAX_CONTEXT_LENGTH = 130;

  const [myAnswer, ] = useAtom(myAnswerAtom);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [articleAnswerData, setArticleAnswerData] = useState<AnswerDataType[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const displayQuestionContext = isExpanded? questionContext: questionContext.length > MAX_CONTEXT_LENGTH? questionContext.slice(0, MAX_CONTEXT_LENGTH) + "...": questionContext;

  // さらに表示ボタンを押したときの処理
  const handleClickExpandedButton = () => {
    setIsExpanded(true);
  }

  useEffect(() => {
    if (myAnswer !== null) {
      setArticleAnswerData(myAnswer.filter((answer) => answer.QID === questionID));
      // QIDが一致し，かつMatchAnswerが1のものがあるかどうか
      const checkCorrect = myAnswer.some((answer) => answer.QID === questionID && answer.MatchAnswer === 1);
      setIsCorrect(checkCorrect);
    }
  }, [myAnswer]);

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
            <div className="mb-4 mt-2 flex">
              <div className="flex items-center mr-1 text-gray-600 dark:text-gray-400">
                <Link href={`/detail/${questionID}/${group.ID}`}>
                  <HeroiconsOutlineChatBubbleOvalLeftEllipsis />
                </Link>
                <p className="text-xs ml-1">{reactionCount}</p>
              </div>
            </div>
          }
          {
            (type === "prod" && isCorrect !== null) &&
            <>
            {
              !checkDate(questionDate)?
              <>
                {isCorrect?
                  <div>
                    <ShowAnswerButton
                      text="正解済み"
                      color="text-green-500"
                      articleAnswerData={articleAnswerData}
                      answerImageUrl={answerImageUrl}
                      questionID={questionID}
                    />
                  </div>
                  :
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
              </>
              :
              <div>
                <ShowAnswerButton
                  text="答えを見る"
                  color=""
                  articleAnswerData={articleAnswerData}
                  answerImageUrl={answerImageUrl}
                  questionID={questionID}
                />
              </div>
            }
            
            </>
          }
        </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;