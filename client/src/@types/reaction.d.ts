import { IDAndCreatedAtType } from "./common";

export interface PostReactionDataType {
  QID: number;
  UID: number;
  ReactionSentence: string;
}

export interface ReactionDataType extends PostReactionDataType, IDAndCreatedAtType {}