import mongoose from 'mongoose';
import { Account } from '../model/Account';
import { Card } from '../model/card';
import {
  AccountCurrency,
  AccountStatus,
  AccountTier,
  AccountType,
  CardType,
  CryptoManager
} from '@m0banking/common';
import { DateFxns } from '../services/helper';
import { CardNetwork } from '../enums/CardNewtwork';

export const accountBuilder = async (
  accId?: string,
  userId?: string,
  status?: AccountStatus
) => {
  const hashedPin = await CryptoManager.hash('1234');

  return await Account.buildAccount({
    id: accId || new mongoose.Types.ObjectId().toHexString(),
    no: 2349043000,
    user: {
      name: 'Muadib',
      id: userId || new mongoose.Types.ObjectId().toHexString()
    },
    balance: 9999,
    pin: hashedPin,
    tier: AccountTier.Private,
    type: AccountType.Current,
    status: status || AccountStatus.Active,
    currency: AccountCurrency.USD,

    version: 0,
    _block: false
  });
};

export const cardBuilder = async () => {
  const { yy, mm, dd } = DateFxns();

  const account = await accountBuilder();

  return await Card.create({
    account: account.id,

    user: {
      id: account.user.id,
      name: account.user.name
    },

    info: {
      billingAddress: 'G50 Balogun gambari compd',
      network: CardNetwork.Visa,
      type: CardType.Debit,
      no: '124928928578566',
      cvv: '123',
      expiryDate: new Date(yy, mm, dd)
    }
  });
};
