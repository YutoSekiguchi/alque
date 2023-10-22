"use client";

import { QuestionDataType } from "@/@types/question";
import { userAtom } from "@/jotai/user";
import { getQuestionsInMyTeams } from "@/services/question";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import QuestionCard from "../../common/article/layout";
import { UserDataType } from "@/@types/user";
import { TeamDataWithoutPasswordType } from "@/@types/team";

const ArticleListLayout: () => JSX.Element = () => {
  const [articleList, setArticleList] = useState<{Question: QuestionDataType, User: UserDataType, TeamWithoutPassword: TeamDataWithoutPasswordType}[]>([]);

  const [user, ] = useAtom(userAtom);

  useEffect(() => {
    const getArticleList = async () => {
      if (user === undefined || user === null) {
        return;
      }

      // uidからユーザが所属してるグループの問題を取得
      const res = await getQuestionsInMyTeams(user.Mail);
      if (res === undefined || res === null) {
        return;
      }
      console.log(res)
      setArticleList(res);
    };
    getArticleList();
  }
  , [user]);

  return(
    <div>
      {
        (user!==null&&user!==undefined) &&
        articleList.map((article, index) => {
          return(
            <div key={index}>
              <QuestionCard
                user={article.User}
                group={article.TeamWithoutPassword}
                questionID={article.Question.ID}
                questionImageUrl={article.Question.QuestionImageUrl}
                answerImageUrl={article.Question.AnswerImageUrl}
                questionContext={article.Question.QuestionSentence}
                questionComment={article.Question.Comment}
                questionHint={article.Question.Hint}
                questionLevel={article.Question.QuestionLevel}
                questionDate={article.Question.Date}
                type="prod"
              />
            </div>
          );
        })
      }
    </div>
  );
}

export default ArticleListLayout;