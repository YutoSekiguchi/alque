import { IDAndCreatedAtType } from "./common";

export interface PostTeamDataType {
  Name: string;
  Password: string;
  Detail: string;
  Image: string;
}

export interface TeamDataType extends PostTeamDataType, IDAndCreatedAtType {}