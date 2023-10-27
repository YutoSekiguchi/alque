import { AnswerDataType } from "@/@types/answer";
import { userAtom } from "@/jotai/user";
import { getAnswersByQID } from "@/services/answer";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import AccuracyPie from "../../graph/accuracy_pie";
import { ResponsivePie } from "@nivo/pie";

interface Props {
  articleAnswerData: AnswerDataType[];
  questionID: number;
}

const ShowAnswerDialogData = (props: Props) => {
  const { articleAnswerData, questionID } = props;

  const [accuracy, setAccuracy] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [answerCount, setAnswerCount] = useState<number>(0);
  const [everyoneAnswerData, setEveryoneAnswerData] = useState<AnswerDataType[]>([]);
  const [data, setData] = useState<{id: string; label: string; value: number;}[]>([]);

  const [user, ] = useAtom(userAtom);

  // uidごとにMatchAnswerに1があるか確認し，正解人数を取得
  const getCorrectAnswerCount = () => {
    if (everyoneAnswerData.length === 0) return 0;
    const correctAnswerData = everyoneAnswerData.filter((answer) => answer.MatchAnswer === 1);
    const correctAnswerCount = correctAnswerData.length;
    return correctAnswerCount;
  }

  // uidごとの人数取得
  const getUserCount = () => {
    if (everyoneAnswerData.length === 0) return 0;
    // userCountにユニークなuidの数を入れる
    const userCount = everyoneAnswerData.filter((answer, index, self) => self.findIndex((a) => a.UID === answer.UID) === index).length;
    return userCount;
  }

  useEffect(() => {
    const correctAnswerData = articleAnswerData.filter((answer) => answer.MatchAnswer === 1);
    const correctAnswerCount = correctAnswerData.length;
    const answerCount = articleAnswerData.length;
    const accuracy = correctAnswerCount / answerCount * 100;

    setAccuracy(accuracy);
    setAnswerCount(answerCount);
    setIsCorrect(correctAnswerCount > 0);
  }
  , [articleAnswerData]);

  //qidから回答を取得
  useEffect(() => {
    if (user === null) return;
    const getEveryoneAnswerData = async() => {
      const res = await getAnswersByQID(questionID, user.Mail);
      if (res === null) return;
      setEveryoneAnswerData(res);
      //ここからグラフ用のデータを作成 MatchAnswerが1の割合と0の割合を出す
      const correctAnswerData = res.filter((answer: AnswerDataType) => answer.MatchAnswer === 1);
      const correctAnswerCount = correctAnswerData.length;
      const answerCount = res.length;
      const incorrectAnswerCount = answerCount - correctAnswerCount;
      setData([
        {
          "id": "正解",
          "label": "正解",
          "value": correctAnswerCount,
        },
        {
          "id": "不正解",
          "label": "不正解",
          "value": incorrectAnswerCount,
        }
      ]);
    }
    getEveryoneAnswerData();
  }, [user]);

  return (
    <div>
      <div className="flex items-center justify-around">
        <p>チャレンジ<span className=" text-green-500 text-4xl font-extrabold">{answerCount}</span>回</p>
        <p>正解者<span className=" text-fuchsia-500 text-4xl font-extrabold">{getCorrectAnswerCount()}</span>人/{getUserCount()}人</p>
      </div>
      {data.length > 0 &&
      <div style={{ height: 400 }} className=" text-gray-500">
        <AccuracyPie data={data}/>
      </div>
      }
    </div>
  );
}

export default ShowAnswerDialogData;