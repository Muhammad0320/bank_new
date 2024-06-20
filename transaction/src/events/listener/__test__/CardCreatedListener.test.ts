import { CardCreatedEvent } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardCreatedListener } from '../CardCreatedListener';
import mongoose from 'mongoose';

const setup = async () => {
  const listener = new CardCreatedListener(natsWrapper.client);

  const data: CardCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    account: '',
    user: User,
    settings: Settings,
    info: Info
  };
};
