import { Subjects } from "../Subjects";

export interface CardExpirationEvent {
  subject: Subjects.CardExpired;

  data: {
    cardId: string;
  };
}
