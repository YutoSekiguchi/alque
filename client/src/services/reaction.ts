import { PostReactionDataType, ReactionDataType } from "@/@types/reaction";

const REACTION_API_URL = `${process.env.API_URL}/reactions`;
const APP_PASS = process.env.APP_PASS;

// qidからリアクションを取得
export const getReactionsByQID = async (qid: number, mail: string) => {
  const url = `${REACTION_API_URL}/qid/${qid}`;
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
export const postReaction = async (data: PostReactionDataType, mail: string) => {
  const url = `${REACTION_API_URL}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
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
    return null;
  }
}

// reactionのデータを送ってDELETE
export const deleteReaction = async (data: ReactionDataType, mail: string) => {
  const url = `${REACTION_API_URL}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
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
    return null;
  }
}

// PUT
export const putReaction = async (data: ReactionDataType, mail: string) => {
  const url = `${REACTION_API_URL}/${data.ID}`;
  try {
    const base64Credentials = btoa(`${APP_PASS}:${mail}`);
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
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
    return null;
  }
}