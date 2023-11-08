import { IDAndCreatedAtType } from "./common";
import { UserDataType } from "./user";

export interface PostReactionDataType {
  QID: number;
  UID: number;
  ReactionSentence: string;
}

export interface ReactionWithUserDataType {
  Reaction: ReactionDataType;
  User: UserDataType;
}

export interface ReactionCountDataType {
  QID: number;
  Count: number;
}

export interface ReactionDataType extends PostReactionDataType, IDAndCreatedAtType {}