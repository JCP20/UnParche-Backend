import { IGroup } from "./groups";
export interface IEvent {
    id_group: IGroup;
    title: string;
    date: Date;
    schedule: string;
    description: string;
    highlights: string[];
    createdAt: string;
    updatedAt: string;
  }