import { FavoriteDataType, PostFavoriteDataType } from "@/@types/favorite";

const FAVORITE_API_URL = `${process.env.API_URL}/favorites`;

export const getFavoriteByQIDAndUID = async (qid: number, uid: number) => {
  const url = `${FAVORITE_API_URL}/qid/${qid}/uid/${uid}`;
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

export const getFavoritesByQID = async (qid: number) => {
  const url = `${FAVORITE_API_URL}/qid/${qid}`;
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

export const getFavoriteCountByQID = async() => {
  const url = `${FAVORITE_API_URL}/count`;
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

// POST
export const postFavorite = async (data: PostFavoriteDataType) => {
  const url = `${FAVORITE_API_URL}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
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

// DELETE
// favoriteデータから削除
export const deleteFavorite = async (data: FavoriteDataType) => {
  const url = `${FAVORITE_API_URL}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
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
