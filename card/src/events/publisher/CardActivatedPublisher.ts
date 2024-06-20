import { CardActivatedEvent, Publisher, Subjects } from '@m0banking/common';

export class CardActivatedPublisher extends Publisher<CardActivatedEvent> {
  readonly subject = Subjects.CardActivated;
}
