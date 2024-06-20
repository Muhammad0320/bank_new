import { CardCreatedEvent } from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import { CardCreatedListener } from '../CardCreatedListener';
import mongoose from 'mongoose';
import { accountBuilder } from '../../../test/builders';

const setup = async () => {
  const listener = new CardCreatedListener(natsWrapper.client);

  const account = await accountBuilder();



  const data: CardCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    account: account.id,
    user: account.user,
    settings: {

      dailyLimit: number;
      weeklyLimit: number;
      monthlyLimit: number;

    },
    info: Info
  };
};
