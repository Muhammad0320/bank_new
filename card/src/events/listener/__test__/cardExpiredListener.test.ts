import { CardExpirationEvent, CardStatus } from '@m0banking/common';
import { cardBuilder } from '../../../test/builders';
import { CardExpiredListener } from '../CardExpiredListener';
import { natsWrapper } from '../../../natswrapper';
import { Message } from 'node-nats-streaming';
import { Card } from '../../../model/card';

const setup = async () => {
  const card = await cardBuilder();

  const data: CardExpirationEvent['data'] = {
    cardId: card.id
  };

  const listener = new CardExpiredListener(natsWrapper.client);

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn()
  };

  return { card, data, msg, listener };
};

it('updates and saves card status', async () => {
  const { card, data, msg, listener } = await setup();

  listener.onMessage(data, msg);

  const refetchedCard = await Card.findById(card.id);

  expect(refetchedCard?.info.status).toEqual(CardStatus.Expired);
});
