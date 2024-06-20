import {
  CardBlockedEent,
  CardStatus,
  Listener,
  Subjects
} from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Card } from '../../model/card';

export class CardBlockedListener extends Listener<CardBlockedEent> {
  readonly subject = Subjects.CardBlocked;

  queueGroupName = queueGroupName;

  async onMessage(data: CardBlockedEent['data'], msg: Message) {
    const { id, version } = data;

    const card = await Card.findByLastVersionAndId(id, version);

    if (!card) throw new Error(`Could not find card`);

    await card.updateOne({ info: { status: CardStatus.Blocked } });

    msg.ack();
  }
}
