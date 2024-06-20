import { CardCreatedEvent, Listener, Subjects } from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Card } from '../../model/card';

export class CardCreatedListener extends Listener<CardCreatedEvent> {
  readonly subject = Subjects.CardCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: CardCreatedEvent['data'], msg: Message) {
    await Card.buildCard(data);

    msg.ack();
  }
}


