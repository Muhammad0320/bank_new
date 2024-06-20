import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../natswrapper';
import { CardActivatedEvent, CardStatus } from '@m0banking/common';
import { CardActivatedListener } from '../CardActivatedListener';
import { Card } from '../../../model/card';

const setup = async () => {
  const listener = new CardActivatedListener(natsWrapper.client);

  const data: CardActivatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 1,
    user: {
      id: new mongoose.Types.ObjectId().toHexString(),

      name: 'Lisan al gaib '
    }
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it(' updated and saved the the card info  ', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedCard = await Card.findById(data.id);

  if (!updatedCard) throw new Error('Card not found');

  expect(updatedCard.info.status).toEqual(CardStatus.Active);
});



it('acks the messgae', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});