import { CardCreatedEvent, Listener, Subjects } from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { cardExpirationQueue } from '../../queue/expirationQueue';

export class CardCreatedListener extends Listener<CardCreatedEvent> {
  queueGroupName = queueGroupName;

  readonly subject = Subjects.CardCreated;

  async onMessage(data: CardCreatedEvent['data'], msg: Message) {
    const delay =
      new Date(data.info.expiryDate).getTime() - new Date().getTime();

    await cardExpirationQueue.add({ cardId: data.id }, { delay });

    msg.ack();
  }
}
