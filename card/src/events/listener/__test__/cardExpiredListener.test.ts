import { CardExpirationEvent } from '@m0banking/common';
import { cardBuilder } from '../../../test/builders';
import { CardExpiredListener } from '../CardExpiredListener';
import { natsWrapper } from '../../../natswrapper';

const setup = async () => {
  const card = await cardBuilder();

  const data: CardExpirationEvent['data'] = {
    cardId: card.id
  };

  const listener = new CardExpiredListener(natsWrapper.client);

  // @ts-ignore

  const msg = {
    ack: jest.fn()
  };

  return { card, data, msg, listener };
};
