"use client";

import { useState } from "react";
import QuestionCard from "../../common/article/layout";
import NewForm from "../form/layout";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import { useAtom } from "jotai";
import { userAtom } from "@/jotai/user";
import AnswerArticleCard from "../../common/article/answer";
import { getNowDate } from "@/modules/get_date";

const NewMainLayout: () => JSX.Element = () => {
  const [user, ] = useAtom(userAtom);
  const [questionImageURL, setQuestionImageURL] = useState<string>("");
  const [answerImageURL, setAnswerImageURL] = useState<string>("");
  const [questionContext, setQuestionContext] = useState<string>("");
  const [answerContext, setAnswerContext] = useState<string>("");
  const [questionLevel, setQuestionLevel] = useState<number>(0);
  const [questionComment, setQuestionComment] = useState<string>("");
  const [selectTeamID, setSelectTeamID] = useState<number>(0);
  const [myTeams, setMyTeams] = useState<TeamDataWithoutPasswordType[]>([]);
  const [selectTeam, setSelectTeam] = useState<TeamDataWithoutPasswordType | null>(null);
  const handleChangeQuestionImageURL = (newValue: string) => {
    setQuestionImageURL(newValue);
  }
  const handleChangeAnswerImageURL = (newValue: string) => {
    setAnswerImageURL(newValue);
  }
  const handleChangeQuestionContext = (newValue: string) => {
    setQuestionContext(newValue);
  };
  const handleChangeQuestionComment = (newValue: string) => {
    setQuestionComment(newValue);
  };
  const handleChangeSelectTeamID = (newValue: number) => {
    setSelectTeamID(newValue);
  }
  const handleChangeMyTeams = (newValue: TeamDataWithoutPasswordType[]) => {
    setMyTeams(newValue);
  }
  const handleChangeAnswerContext = (newValue: string) => {
    setAnswerContext(newValue);
  }
  const handleChangeQuestionLevel = (newValue: number) => {
    setQuestionLevel(newValue);
  }
  const handleChangeSelectTeam = (newValue: TeamDataWithoutPasswordType | null) => {
    setSelectTeam(newValue);
  }

  


  return (
    <>
      <div className="w-[55%]">
        <NewForm
          handleChangeQuestionImageURL={handleChangeQuestionImageURL}
          handleChangeAnswerImageURL={handleChangeAnswerImageURL}
          handleChangeQuestionContext={handleChangeQuestionContext}
          handleChangeQuestionComment={handleChangeQuestionComment}
          handleChangeSelectTeamID={handleChangeSelectTeamID}
          handleChangeMyTeams={handleChangeMyTeams}
          handleChangeSelectTeam={handleChangeSelectTeam}
          handleChangeAnswerContext={handleChangeAnswerContext}
          handleChangeQuestionLevel={handleChangeQuestionLevel}
          questionImageURL={questionImageURL}
          answerImageURL={answerImageURL}
          questionContext={questionContext}
          questionComment={questionComment}
          selectTeamID={selectTeamID}
          myTeams={myTeams}
          answerContext={answerContext}
          questionLevel={questionLevel}
        />
      </div>
      <div className="w-[40%] mx-auto">
        {user !== null &&
          <>
            <QuestionCard
              user={user}
              group={selectTeam == null ? { ID: 0, Name: "", Detail: "", Image: "", CreatedAt: "" } : selectTeam}
              questionImageUrl={questionImageURL}
              answerImageUrl={answerImageURL}
              questionContext={questionContext}
              questionComment={questionComment}
              questionLevel={questionLevel}
              questionDate={getNowDate()}
              type={"demo"}
            />
            <div className="mt-6 pt-6 border-dashed border-t">
              <AnswerArticleCard
                answerImageUrl={answerImageURL}
                answerContext={answerContext}
                questionDate={getNowDate()}
              />
            </div>
          </>
        }
      </div>
    </>
  );
}

export default NewMainLayout;