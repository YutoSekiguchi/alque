"use client";

import { QuestionDataType } from "@/@types/question";
import { userAtom } from "@/jotai/user";
import { getQuestionsInMyTeams } from "@/services/question";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import QuestionCard from "../../common/article/layout";
import { UserDataType } from "@/@types/user";
import { TeamDataWithoutPasswordType } from "@/@types/team";
import { myAnswerAtom } from "@/jotai/my_answer";
import { getAnswersByUID } from "@/services/answer";
import { ReactionCountDataType } from "@/@types/reaction";
import { FavoriteCountDataType } from "@/@types/favorite";

interface Props {
  reactionCountData: ReactionCountDataType[];
  favoriteCountData: FavoriteCountDataType[];
}

const ArticleListLayout: (props: Props) => JSX.Element = (props: Props) => {
  const { reactionCountData, favoriteCountData } = props;
  const [articleList, setArticleList] = useState<{Question: QuestionDataType, User: UserDataType, TeamWithoutPassword: TeamDataWithoutPasswordType}[]>([]);

  const [user, ] = useAtom(userAtom);
  const [, setMyAnswers] = useAtom(myAnswerAtom);

  // reactionCountDataとfavoriteCountDataのQIDと一致する要素のCountをそれぞれ返す
  const getReactionCountAndFavoriteCount = (QID: number) => {
    const reactionCount: ReactionCountDataType | undefined = reactionCountData === null? undefined: reactionCountData.find((reactionCount) => reactionCount.QID === QID);
    const favoriteCount: FavoriteCountDataType | undefined = favoriteCountData === null? undefined: favoriteCountData.find((favoriteCount) => favoriteCount.QID === QID);
    return {
      reactionCount: reactionCount === undefined? 0: reactionCount.Count,
      favoriteCount: favoriteCount === undefined? 0: favoriteCount.Count
    };
  };

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
      const myAnswerList = await getAnswersByUID(user.ID, user.Mail);
      setArticleList(res);
      setMyAnswers(myAnswerList);
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
                reactionCount={getReactionCountAndFavoriteCount(article.Question.ID).reactionCount}
                favoriteCount={getReactionCountAndFavoriteCount(article.Question.ID).favoriteCount}
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