export const convertToJST = (timestamp: string) => {
  // UTCのタイムスタンプをDateオブジェクトとしてパースする
  const jstDate = new Date(timestamp);

  // 年月日時分を取得
  const year = jstDate.getFullYear();
  const month = (jstDate.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるので1を加える
  const day = jstDate.getDate().toString().padStart(2, '0');
  const hours = jstDate.getHours().toString().padStart(2, '0');
  const minutes = jstDate.getMinutes().toString().padStart(2, '0');

  // 指定された形式で日本時間を返す
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}