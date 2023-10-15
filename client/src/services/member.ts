import { PostMemberDataType } from "../../@types/member";

const MEMBER_API_URL = `${process.env.API_URL}/members`;

export const getMembersByUID = async(uid: number) => {
  const url = `${MEMBER_API_URL}/uid/${uid}`;
  try {
    const response = await fetch(url, {
    method: "GET",
    })
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('There was an error!', error);
    return null;
  }
}

export const getMembersByTID = async(tid: number) => {
  const url = `${MEMBER_API_URL}/tid/${tid}`;
  try {
    const response = await fetch(url, {
    method: "GET",
    })
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('There was an error!', error);
    return null;
  }
}

export const postMember = async(data: PostMemberDataType) => {
  try {
    const response = await fetch(MEMBER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) {
      console.log(response);
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('There was an error!', error);
  }
}