"use client";

import { myAnswerAtom } from "@/jotai/my_answer";
import { userAtom } from "@/jotai/user";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import MainScore from "./main_score";
import QuestionLevelScore from "./questionlevel_score";
import { CalendarRecordDataType } from "@/@types/common";
import CalendarRecord from "./calender_record";
import { getNowDate, getThreeMonthAgoDate } from "@/modules/get_date";

const GraphArea: () => JSX.Element = () => {
  const [myAnswer, ] = useAtom(myAnswerAtom);
  const [user, ] = useAtom(userAtom);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [totalCorrectCount, setTotalCorrectCount] = useState<number>(0);
  const [questionLevelScoreData, setQuestionLevelScoreData] = useState<{
    QuestionLevel: string;
    Correct: number;
    InCorrect: number;
  }[]>([]);
  const [calendarRecordData, setCalendarRecordData] = useState<CalendarRecordDataType | null>(null);

  const getCalendarRecordData = () => {
    // myAnswerのCreatedAtから日付ごとにデータが何個存在するかを取得
    // createdatは時間も含まれちゃってるので、日付だけにする
    const calendarRecordDataTmp: CalendarRecordDataType = {to: getNowDate("month"), from: getThreeMonthAgoDate(), data: []};
    const createdAtDateList: string[] = [];
    myAnswer.forEach((answer) => {
      const createdAtDate = answer.CreatedAt.split("T")[0];
      createdAtDateList.push(createdAtDate);
    });
    // createdAtDateListから重複を削除
    const createdAtDateListUnique = createdAtDateList.filter((x, i, self) => self.indexOf(x) === i);
    // createdAtDateListUniqueから日付ごとのデータの数を取得
    createdAtDateListUnique.forEach((date) => {
      const dateData = createdAtDateList.filter((createdAtDate) => createdAtDate === date);
      calendarRecordDataTmp.data.push({
        day: date,
        value: dateData.length,
      });
    });
    setCalendarRecordData(calendarRecordDataTmp);
  }

  useEffect(() => {
    if (myAnswer === null) return;
    // myAnswerから正解数を取得
    const correctAnswerData = myAnswer.filter((answer) => answer.MatchAnswer === 1);
    const correctAnswerCount = correctAnswerData.length;
    const answerCount = myAnswer.length;
    const accTmp = correctAnswerCount / answerCount * 100;
    setAccuracy(accTmp);
    setTotalCorrectCount(correctAnswerCount);
    // myAnswerをquestionLevelごとに分割して正解数や回答数を取得
    const questionLevelScoreDataTmp: {
      QuestionLevel: string;
      Correct: number;
      InCorrect: number;
    }[] = [];
    for (let i=1; i<=5; i++) {
      const questionLevelData = myAnswer.filter((answer) => answer.QuestionLevel === i);
      const correctAnswerData = questionLevelData.filter((answer) => answer.MatchAnswer === 1);
      const correctAnswerCount = correctAnswerData.length;
      const answerCount = questionLevelData.length;
      const accuracy = correctAnswerCount / answerCount * 100;
      questionLevelScoreDataTmp.push({
        "QuestionLevel": `${i}`,
        "Correct": correctAnswerCount,
        "InCorrect": answerCount - correctAnswerCount,
      });
    }
    
    getCalendarRecordData();

    setQuestionLevelScoreData(questionLevelScoreDataTmp);
  }
  , [myAnswer]);

  

  return (
    <div className="p-2">
      {
        (user!==null && user!==undefined) &&
        <>
          <div className="mt-2 mb-4">
            <MainScore accuracy={accuracy} totalCorrectCount={totalCorrectCount} />
          </div>
          {
          (questionLevelScoreData && questionLevelScoreData.length !== 0) &&
            <div className="my-4">
              <QuestionLevelScore data={questionLevelScoreData} />
            </div>
          }
          {
            calendarRecordData !== null &&
            <div className="my-4">
              <CalendarRecord from={calendarRecordData.from} to={calendarRecordData.to} data={calendarRecordData.data} />
            </div>
          }
        </>
      }
    </div>
  );
}

export default GraphArea;