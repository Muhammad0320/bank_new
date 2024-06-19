import { Info } from "../../types/CardFieldTypes";
import { Subjects } from "../Subjects";

export interface CardBlockedEent {
  subject: Subjects.CardBlocked;

  data: {
    info: Info;
  };
}
