// 2つの文字列が一致するかどうかを判定する関数
export const getMatchAnswer: (answer: string, inputAnswer: string) => number = (answer: string, inputAnswer: string) => {
  if (answer === inputAnswer) {
    return 1;
  }
  return 0;
};