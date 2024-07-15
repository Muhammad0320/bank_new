import { CardExpirationEvent, Publisher, Subjects } from '@m0banking/common';

export class CardExpirationPublisher extends Publisher<CardExpirationEvent> {
  readonly subject = Subjects.CardExpired;
}
