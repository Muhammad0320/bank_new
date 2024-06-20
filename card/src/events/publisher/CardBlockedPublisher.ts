import { CardBlockedEent, Publisher, Subjects } from '@m0banking/common';

export class CardBlockedPublisher extends Publisher<CardBlockedEent> {
  readonly subject = Subjects.CardBlocked;
}
