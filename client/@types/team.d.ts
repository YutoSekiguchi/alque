export interface PostTeamDataType {
  name: string;
  password: string;
  detail: string;
  image: string;
}

export interface TeamDataType extends PostTeamDataType, IDAndCreatedAtType {}