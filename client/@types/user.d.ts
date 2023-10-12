export interface PostUserDataType {
  name: string;
  displayName: string;
  mail: string;
  image: string;
  dark: number;
}

export interface UserDataType extends PostUserDataType, IDAndCreatedAtType {}