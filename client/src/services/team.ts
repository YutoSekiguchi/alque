import { PostTeamDataType } from "@/@types/team";

const TEAM_API_URL = `${process.env.API_URL}/teams`;

export const getAllTeams = async () => {
  const url = `${TEAM_API_URL}`;
  try {
    const response = await fetch(url, {
      method: "GET",
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

export const getTeamByID = async (tid: number) => {
  const url = `${TEAM_API_URL}/${tid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
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

export const getTeamByIDAndPassword = async (tid: number, password: string) => {
  const url = `${TEAM_API_URL}/auth/${tid}/${password}`;
  try {
    const response = await fetch(url, {
      method: "GET",
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

export const getTeamsByUID = async (uid: number) => {
  const url = `${TEAM_API_URL}/uid/${uid}`;
  try {
    const response = await fetch(url, {
      method: "GET",
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

export const postTeam = async (data: PostTeamDataType) => {
  try {
    const response = await fetch(TEAM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
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
};
