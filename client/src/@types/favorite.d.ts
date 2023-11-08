import { IDAndCreatedAtType } from "./common";

export interface PostFavoriteDataType {
  QID: number;
  UID: number;
}

export interface FavoriteCountDataType {
  QID: number;
  Count: number;
}

export interface FavoriteDataType extends PostFavoriteDataType, IDAndCreatedAtType {}