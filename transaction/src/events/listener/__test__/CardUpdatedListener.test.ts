import { CardUpdatedEvent } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardBuilder } from '../../../test/builders';
import { CardUpdatedListener } from '../CardUpdatedListener';
import { Message } from 'node-nats-streaming';

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
