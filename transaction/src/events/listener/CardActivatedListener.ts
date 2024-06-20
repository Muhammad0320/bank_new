import {
  CardActivatedEvent,
  CardStatus,
  Listener,
  Subjects
} from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Card } from '../../model/card';

export class CardActivatedListener extends Listener<CardActivatedEvent> {
  readonly subject = Subjects.CardActivated;

  queueGroupName = queueGroupName;

  async onMessage(data: CardActivatedEvent['data'], msg: Message) {
    const { id, version } = data;

    const card = await Card.findByLastVersionAndId(id, version);

    if (!card) throw new Error('Card not found');

    await card.updateOne({ info: { status: CardStatus.Active } });

    msg.ack();
  }
}



