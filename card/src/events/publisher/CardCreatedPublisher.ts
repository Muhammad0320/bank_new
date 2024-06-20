import { CardCreatedEvent, Publisher, Subjects } from '@m0banking/common';

export class CardCreatedPublisher extends Publisher<CardCreatedEvent> {
  readonly subject = Subjects.CardCreated;
}
