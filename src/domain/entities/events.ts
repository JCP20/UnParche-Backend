import { IGroup } from "./groups";
export interface IEvent {
  id_group: IGroup;
  title: string;
  date: Date;
  schedule: string;
  description: string;
  users: string[];
  createdAt: string;
  updatedAt: string;
}
