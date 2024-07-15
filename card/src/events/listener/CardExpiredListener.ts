import { Listener, CardExpirationEvent, Subjects } from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';

export class CardExpiredListener extends Listener<CardExpirationEvent> {
  readonly subject = Subjects.CardExpired;

  queueGroupName = queueGroupName;

  async onMessage(data: CardExpirationEvent['data'], msg: Message) {}
}
