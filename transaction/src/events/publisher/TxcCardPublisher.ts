import { Publisher, Subjects, TxnCardCreatedEvent } from '@m0banking/common';

export class TxnCardPublisher extends Publisher<TxnCardCreatedEvent> {
  readonly subject = Subjects.TxnCardCreated;
}
