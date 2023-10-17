import { PostQuestionDataType, QuestionDataType } from "@/@types/question";

const QUESTION_API_URL = `${process.env.API_URL}/questions`;
const APP_PASS = process.env.APP_PASS;

// idから問題を取得
export const getQuestionByID = async (id: number, mail: string) => {
  const url = `${QUESTION_API_URL}/${id}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
}

// tidから問題を取得
export const getQuestionsByTID = async (tid: number, mail: string) => {
  const url = `${QUESTION_API_URL}/tid/${tid}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    });
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error!", error);
    return null;
  }
}

// 問題の追加
export const postQuestion = async (data: PostQuestionDataType, mail: string) => {
  const url = `${QUESTION_API_URL}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${base64Credentials}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error!", error);
  }
}

// 問題の更新
export const putQuestion = async (data: QuestionDataType, mail: string) => {
  const url = `${QUESTION_API_URL}/${data.ID}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${base64Credentials}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error!", error);
  }
}