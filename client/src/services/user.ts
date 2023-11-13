import { PostUserDataType } from "@/@types/user";

const USER_API_URL = `${process.env.API_URL}/users`;
const APP_PASS = process.env.APP_PASS;

export const getUserByMail = async (mail: string) => {
  const url = `${USER_API_URL}/me?mail=${mail}`;
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
};

// uidからユーザーを取得
export const getUserByID = async (uid: number, mail: string) => {
  const url = `${USER_API_URL}/${uid}`;
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
};

export const signin = async (data: PostUserDataType) => {
  let isExist = false;
  const existUser = await getUserByMail(data.Mail);
  if (existUser !== null) {
    isExist = true;
    return existUser;
  }
  if (!isExist) {
    const url = `${USER_API_URL}`;
    if (APP_PASS === undefined) {
      return;
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Basic ${btoa(APP_PASS)}`,
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
};
