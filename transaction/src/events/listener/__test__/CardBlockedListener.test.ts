import { CardBlockedEent, CardStatus } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardBuilder } from '../../../test/builders';
import { CardBlockedListener } from '../CardBlockedListener';
import { Card } from '../../../model/card';

const setup = async () => {
  const listener = new CardBlockedListener(natsWrapper.client);

  const card = await CardBuilder();

  const data: CardBlockedEent['data'] = {
    id: card.id,
    version: card.version + 1,
    user: card.user,
    reason: 'shit'
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it('updates and saves the card', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedCard = await Card.findById(data.id);

  if (!updatedCard) throw new Error('Card not found');

  expect(updatedCard.info.status).toEqual(CardStatus.Blocked);
});



it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

