import {
  AccountCurrency,
  AccountStatus,
  AccountTier,
  AccountType,
  CardCreatedEvent,
  CardNetwork,
  CardStatus,
  CardType,
  DateFxns,
  generateCardNumber,
  generateCVV
} from '@m0banking/common';
import mongoose from 'mongoose';
import { Account } from '../model/account';
import { Card } from '../model/card';

export const accountBuilder = async (
  accId?: string,
  userId?: string,
  status?: AccountStatus
) => {
  return await Account.buildAccount({
    id: accId || new mongoose.Types.ObjectId().toHexString(),
    no: 2349043000,
    user: {
      name: 'Muadib',
      id: userId || new mongoose.Types.ObjectId().toHexString()
    },
    balance: 9999,
    pin: '1234',
    tier: AccountTier.Private,
    type: AccountType.Current,
    status: status || AccountStatus.Active,
    currency: AccountCurrency.USD,

    version: 0,
    _block: false
  });
};




export const CardBuilder = async () => {
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
                                             billingAddress:
                                               'G505, Balogun gambari compd.',
                                             maxCredit: undefined
                                           }
                                         };

                                         return await Card.buildCard(data);
                                       };   

