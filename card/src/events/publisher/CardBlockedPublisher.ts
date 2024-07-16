import { CardBlockedEvent, Publisher, Subjects } from '@m0banking/common';

export class CardBlockedPublisher extends Publisher<CardBlockedEvent> {
  readonly subject = Subjects.CardBlocked;
}
