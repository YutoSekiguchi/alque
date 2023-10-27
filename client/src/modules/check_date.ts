// YYYY-MM-DD形式で入力された日付が昨日以前かどうかを判定する
// 今日以降ならtrueを返す
export const checkDate = (date: string): boolean => {
  const today = new Date();
  const yesterday = new Date(today.setDate(today.getDate() - 1));
  const inputDate = new Date(date);
  return inputDate >= yesterday;
};