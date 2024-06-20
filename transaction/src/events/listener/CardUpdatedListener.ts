import { CardUpdatedEvent, Listener, Subjects } from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Card } from '../../model/card';

export class CardUpdatedListener extends Listener<CardUpdatedEvent> {
  readonly subject = Subjects.CardUpdated;

  queueGroupName = queueGroupName;

  async onMessage(data: CardUpdatedEvent['data'], msg: Message): Promise<void> {
    const { id, version, settings } = data;

    const card = await Card.findByLastVersionAndId(id, version);

    if (!card) throw new Error(`Could not find card `);

    await card.updateOne({ settings: settings });

    msg.ack();
  }
}
