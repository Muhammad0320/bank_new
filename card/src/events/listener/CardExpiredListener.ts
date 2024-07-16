import {
  Listener,
  CardExpirationEvent,
  Subjects,
  CardStatus
} from '@m0banking/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Card } from '../../model/card';

export class CardExpiredListener extends Listener<CardExpirationEvent> {
  readonly subject = Subjects.CardExpired;

  queueGroupName = queueGroupName;

  async onMessage(data: CardExpirationEvent['data'], msg: Message) {
    const card = await Card.findById(data.cardId);

    
    if (!card) throw new Error('Card not found');

    card.set({ info: { ...card.info, status: CardStatus.Expired } });
    await card.save();

    console.log(card, 'The card from the listener');


    msg.ack();
  }
}
