import { CardBlockedEent } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardBuilder } from '../../../test/builders';
import { CardBlockedListener } from '../CardBlockedListener';

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
