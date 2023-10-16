import { IDAndCreatedAtType } from "./common";

export interface PostUserDataType {
  Name: string;
  DisplayName: string;
  Mail: string;
  Image: string;
  Dark: number;
}

export interface UserDataType extends PostUserDataType, IDAndCreatedAtType {}