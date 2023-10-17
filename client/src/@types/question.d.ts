import { IDAndCreatedAtType } from "./common";

export interface PostQuestionDataType {
  UID: number;
  TID: number;
  QuesionImageURL: string;
  AnswerImageURL: string;
  QuestionSentence: string;
  Comment?: string;
  Hint?: string;
  Date: string;
}

export interface QuestionDataType extends PostQuestionDataType, IDAndCreatedAtType {}