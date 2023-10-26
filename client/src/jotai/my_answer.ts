import { atom } from 'jotai';
import { AnswerDataType } from '../@types/answer';

export const myAnswerAtom = atom<AnswerDataType[]>([]);