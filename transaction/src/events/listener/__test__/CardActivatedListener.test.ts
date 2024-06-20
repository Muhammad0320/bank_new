import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '../../../natswrapper';
import { CardActivatedEvent } from '@m0banking/common';
import { CardActivatedListener } from '../CardActivatedListener';

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

it('');
