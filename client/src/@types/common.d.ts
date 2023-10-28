export interface IDAndCreatedAtType {
  ID: number;
  CreatedAt: string;
}

export interface CalendarRecordDataType {
  from: string;
  to: string;
  data: {
    day: string;
    value: number;
  }[];
}