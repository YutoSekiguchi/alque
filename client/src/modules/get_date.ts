// 日本の現在時刻をYYYY-MM-DD HH:MM形式で返す
export const getNowDate = (mode: string = "minute") => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  return mode==="minute" ? `${year}-${month}-${day} ${hour}:${minute}`: `${year}-${month}-${day}`;
};

// 3ヶ月前の日付をYYYY-MM-DD形式で返す
export const getThreeMonthAgoDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() - 5)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};