import { IDAndCreatedAtType } from "./common";

export interface PostMemberDataType {
  UID: number;
  TID: number;
}

export interface MemberDataType extends PostMemberDataType, IDAndCreatedAtType {}