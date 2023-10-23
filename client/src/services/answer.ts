import { PostAnswerDataType } from "@/@types/answer";

const ANSWER_API_URL = `${process.env.API_URL}/answers`;
const APP_PASS = process.env.APP_PASS;

// GET
// idから回答を取得
export const getAnswerByID = async (id: number, mail: string) => {
  const url = `${ANSWER_API_URL}/${id}`;
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

// uidから自分の回答を取得
export const getAnswersByUID = async (uid: number, mail: string) => {
  const url = `${ANSWER_API_URL}/uid/${uid}`;
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

// qidから回答を取得
export const getAnswersByQID = async (qid: number, mail: string) => {
  const url = `${ANSWER_API_URL}/qid/${qid}`;
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

// tidから回答を取得
export const getAnswersByTID = async (tid: number, mail: string) => {
  const url = `${ANSWER_API_URL}/tid/${tid}`;
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

// POST
export const postAnswer = async (data: PostAnswerDataType, mail: string) => {
  const url = `${ANSWER_API_URL}`;
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