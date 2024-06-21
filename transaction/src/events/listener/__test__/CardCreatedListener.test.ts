import {
  CardCreatedEvent,
  CardNetwork,
  CardStatus,
  CardType,
  DateFxns,
  generateCardNumber,
  generateCVV
} from '@m0banking/common';
import { natsWrapper } from '../../../natswrapper';
import mongoose from 'mongoose';
import { accountBuilder } from '../../../test/builders';
import { Card } from '../../../model/card';
import { CardCreatedListener } from '../CardCreatedListener';

const setup = async () => {
  const listener = new CardCreatedListener(natsWrapper.client);

  const account = await accountBuilder();

  const cardNumber = generateCardNumber();

  const cvv = generateCVV();

  const { yy, mm } = DateFxns();

  const data: CardCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    account: account.id,
    user: account.user,
    settings: {
      dailyLimit: 50,
      weeklyLimit: 500,
      monthlyLimit: 5000
    },
    info: {
      no: cardNumber,
      network: CardNetwork.Verve,
      status: CardStatus.Inactive,
      type: CardType.Debit,
      cvv: cvv,
      expiryDate: new Date(yy, mm),
      issueDate: new Date(),
      billingAddress: 'G505, Balogun gambari compd.',
      maxCredit: undefined
    }
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { data, msg, listener, account };
};

it('created and saved the card', async () => {
  const { data, msg, listener } = await setup();

  await listener.onMessage(data, msg);

  const card = await Card.findById(data.id);

  expect(card).toBeDefined();

  if (!card) throw new Error(`Cannot find card `);

  expect(card.id).toEqual(data.id);

  expect(card.user.id).toEqual(data.user.id);

  expect(card.user.name).toEqual(data.user.name);
});


it('acks the message', async () => {
  const { data, msg, listener } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

