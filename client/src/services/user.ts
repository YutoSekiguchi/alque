import { PostUserDataType } from "../../@types/user";

const USER_API_URL = `${process.env.API_URL}/users`;

export const signin = async(data: PostUserDataType) => {
  const url = `${USER_API_URL}/signin`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data)
  });
}