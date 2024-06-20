import { CardUpdatedEvent, Publisher, Subjects } from '@m0banking/common';

export class CardUpdatedPublisher extends Publisher<CardUpdatedEvent> {
  readonly subject = Subjects.CardUpdated;
}
