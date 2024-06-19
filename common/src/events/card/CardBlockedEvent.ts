import { Info, User } from "../../types/CardFieldTypes";
import { Subjects } from "../Subjects";

export interface CardBlockedEent {
  subject: Subjects.CardBlocked;

  data: {
    id: string;
    version: number;
    reason: string;
    user: User;
  };
}
