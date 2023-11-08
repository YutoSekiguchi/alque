"use client";

import { useAtom } from "jotai";
import QuestionCard from "../../common/article/layout";
import { userAtom } from "@/jotai/user";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import { getTeamByID } from "@/services/team";
import { getQuestionByID } from "@/services/question";
import { QuestionDataType } from "@/@types/question";
import PostMessageContainer from "../post_message_container";
import ReactionList from "../reaction_list";

const DetailMainLayout: () => JSX.Element = () => {

  const [user, ] = useAtom(userAtom);
  const params = useParams();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { tid, qid } = params;
  const [team, setTeam] = useState<TeamDataWithoutPasswordType | null>(null);
  const [question, setQuestion] = useState<QuestionDataType | null>(null);

  const handleChange = () => {
    setIsChanged(!isChanged);
  }

  useEffect(() => {
    if (tid === null || qid === null) return;
    const getTeam = async () => {
      if (Number(tid) === 0) {
        setTeam({
          ID: 0,
          Name: "All",
          Detail: "",
          Image: "",
          CreatedAt: "",
        });
        return;
      }
      const teamRes = await getTeamByID(Number(tid));
      if (teamRes === null) return;
      setTeam(teamRes);
    }
    const getQuestion = async () => {
      if (user === null) return;
      const questionRes = await getQuestionByID(Number(qid), user.Mail);
      if (questionRes === null) return;
      setQuestion(questionRes);
    }
    getTeam();
    getQuestion();
  }
  , [tid, qid, user]);

  return (
    <>
      <div className="pt-4 w-[55%] border-right">
        {user && team && question &&
          <div>
            <QuestionCard
              user={user}
              group={team}
              questionID={question.ID}
              questionImageUrl={question.QuestionImageUrl}
              answerImageUrl={question.AnswerImageUrl}
              questionContext={question.QuestionSentence}
              questionComment={question.Comment}
              questionHint={question.Hint}
              questionLevel={question.QuestionLevel}
              questionDate={question.Date}
              type="detail"
            />
            <ReactionList questionID={question.ID} isChange={isChanged} />
          </div>
        }
      </div>
      <div className="w-[45%] mx-auto">
        {question&&
          <PostMessageContainer questionID={question.ID} setHnadleChange={handleChange} />
        }
      </div>
    </>
  );
};

export default DetailMainLayout;