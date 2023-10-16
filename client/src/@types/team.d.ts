import { IDAndCreatedAtType } from "./common";

export interface PostTeamDataType {
  Name: string;
  Password: string;
  Detail: string;
  Image: string;
}

export interface TeamDataWithoutPasswordType {
  ID: number;
  Name: string;
  Detail: string;
  Image: string;
  CreatedAt: string;
}

export interface TeamDataType extends PostTeamDataType, IDAndCreatedAtType {}