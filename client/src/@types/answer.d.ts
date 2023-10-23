import { IDAndCreatedAtType } from "./common";

export interface PostAnswerDataType {
  QID: number;
  UID: number;
  PredImageUrl: string;
  MatchAnswer: number;
  QuestionLevel: number;
}

export interface AnswerDataType extends PostAnswerDataType, IDAndCreatedAtType {}