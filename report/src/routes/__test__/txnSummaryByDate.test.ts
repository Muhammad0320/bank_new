import {
  AccountCurrency,
  AccountStatus,
  AccountTier,
  AccountType,
  CryptoManager,
  TxnTypeEnum
} from '@m0banking/common';
import { app } from '../../app';
import request from 'supertest';
import { Txn } from '../../models/transaction';
import { Account } from '../../models/account';
import mongoose from 'mongoose';

const accountBuilder = async (userId: string) => {
  return await Account.buildAccount({
    currency: AccountCurrency.NGN,

    pin: await CryptoManager.hash('1234'),

    userId,

    status: AccountStatus.Active,

    id: new mongoose.Types.ObjectId().toHexString(),
    balance: 0,
    version: 0,
    no: Math.floor(83923939393 * Math.random() * 1.5),
    _block: false,
    tier: AccountTier.Basic,
    type: AccountType.Current
  });
};

const txnBuilder = async (
  amount: number,
  type: TxnTypeEnum,
  userId: string
) => {
  const account = await accountBuilder(userId);

  return await Txn.buildTxn({
    account,
    amount,
    type
  });
};

it('passes', async () => {});

// it('returns a 401, for unauthorized user', async () => {
//   await request(app)
//     .get('/api/v1/report/summaryByDate/2024')
//     .send()
//     .expect(401);
// });

// it('returns status other than 401, to show that routes exists', async () => {
//   const { statusCode } = await request(app)
//     .get('/api/v1/report/summaryByDate/2024')
//     .send();

//   expect(statusCode).not.toEqual(404);
// });

// it('returns a 400, if theres no year', async () => {
//   await request(app)
//     .get('/api/v1/report/summaryByDate')
//     .send()
//     .set('Cookie', await global.signin())
//     .expect(400);
// });

// it('returns a 400, if invalid year is provided', async () => {
//   await request(app)
//     .get('/api/v1/report/summaryByDate/2044')
//     .send()
//     .set('Cookie', await global.signin())
//     .expect(400);
// });

// it('returns a 400, if invalid month is provided', async () => {
//   await request(app)
//     .get('/api/v1/report/summaryByDate/2024/30')
//     .send()
//     .set('Cookie', await global.signin())
//     .expect(400);
// });

// it('returns a 200, if everything is valid', async () => {
//   const userId = new mongoose.Types.ObjectId().toHexString();

//   txnBuilder(5000, TxnTypeEnum.Deposit, userId);
//   txnBuilder(10000, TxnTypeEnum.Deposit, userId);
//   txnBuilder(1000, TxnTypeEnum.Deposit, userId);
//   txnBuilder(1000, TxnTypeEnum.Withdrawal, userId);
//   txnBuilder(900, TxnTypeEnum.Withdrawal, userId);
//   txnBuilder(900, TxnTypeEnum.Transfer, userId);

//   await request(app)
//     .get('/api/v1/report/summaryByDate/2024/4')
//     .send()
//     .set('Cookie', await global.signin(userId))
//     .expect(200);
// });
