export interface PostMemberDataType {
  uid: number;
  tid: number;
}

export interface MemberDataType extends PostMemberDataType, IDAndCreatedAtType {}