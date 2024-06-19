import { Info, Settings, User } from "../../types/CardFieldTypes";
import { Subjects } from "../Subjects";

export interface CardCreatedEvent {
  subject: Subjects.CardCreated;

  data: {
    id: string;
    version: number;
    account: string;

    user: User;
    settings: Settings;
    info: Info;
  };
}
