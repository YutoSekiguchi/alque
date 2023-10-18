import { IDAndCreatedAtType } from "./common";

export interface PostQuestionDataType {
  UID: number;
  TID: number;
  QuestionImageURL: string;
  AnswerImageURL: string;
  QuestionSentence: string;
  AnswerSentence: string;
  QuestionLevel: number;
  Comment?: string;
  Hint?: string;
  Date: string;
}

export interface QuestionDataType extends PostQuestionDataType, IDAndCreatedAtType {}