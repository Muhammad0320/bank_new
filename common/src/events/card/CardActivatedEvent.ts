import { Subjects } from "../Subjects";
import { User } from "../../types/CardFieldTypes";

export interface CardActivatedEvent {
  subject: Subjects.CardActivated;

  data: {
    id: string;
    version: number;

    user: User;
  };
}
