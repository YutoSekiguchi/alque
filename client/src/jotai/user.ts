import { atom } from "jotai";
import { UserDataType } from "../../@types/user";

export const userAtom = atom<UserDataType | null>(null);

export const userDarkModeAtom = atom<boolean>(false);