import { CardUpdatedEvent } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardBuilder } from '../../../test/builders';
import { CardUpdatedListener } from '../CardUpdatedListener';
import { Message } from 'node-nats-streaming';
import { Card } from '../../../model/card';

const setup = async () => {
  const listener = new CardUpdatedListener(natsWrapper.client);

  const card = await CardBuilder();

  const data: CardUpdatedEvent['data'] = {
    id: card.id,
    version: card.version + 1,
    settings: {
      dailyLimit: 500,
      weeklyLimit: 1000,
      monthlyLimit: 99999
    }
  };

  // @ts-ignore

  const msg: Message = {
    ack: jest.fn()
  };

  return { msg, listener, data };
};



it("updates the card's settings ", async () => {
  const { msg, listener, data } = await setup();

  await listener.onMessage(data, msg);

  const updatedCard = await Card.findById(data.id);

  if (!updatedCard) throw new Error('Card not found');

  expect(updatedCard.settings.dailyLimit).toEqual(data.settings.dailyLimit);

  expect(updatedCard.settings.weeklyLimit).toEqual(data.settings.weeklyLimit);

  expect(updatedCard.settings.monthlyLimit).toEqual(data.settings.monthlyLimit);
});


  

it('acks the messgae', async () => {
  const { msg, listener, data } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});