import { NotFound, requestValidator, requireAuth } from '@m0banking/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { validateAccount } from '../middlewares/validateAccount';
import { Account } from '../model/account';
import { Txn } from '../model/transaction';
import { TxnTypeEnum } from '../enums/TxnTypeEnum';
import { TxnStatusEnum } from '../enums/TxnStatusEnum';
import { TxnTransferPublisher } from '../events/publisher/TxnTransferPublisher';
import { natsWrapper } from '../natswrapper';
import { invalidAttemptTracker } from '../middlewares/invalidAttemptTracker';

const router = express.Router();

router.post(
  '/transfer',
  requireAuth,
  [
    body('amount')
      .isFloat({ gt: 0 })
      .withMessage('Please enter a valid amount!'),
    body('accountId')
      .isString()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Please provide a valid accountId'),

    body('beneficiaryId')
      .isString()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('Please provide a valid beneficiaryId'),

    body('pin')
      .isInt()
      .isLength({ min: 4, max: 4 })
      .withMessage('Please provide a valid pin'),

    body('reason')
      .trim()
      .isString()
      .optional()
  ],
  requestValidator,
  validateAccount('transfer'),

  async (req: Request, res: Response) => {
    const { amount, accountId, beneficiaryId, reason } = req.body;

    const account = await Account.findById(accountId);

    const beneficiary = await Account.findById(beneficiaryId);

    if (!account || !beneficiary) throw new NotFound('Accounts not found');

    const updatedAccount = await account.updateOne(
      { balance: account.balance - amount },
      { new: true }
    );

    console.log(updatedAccount, 'updatedAccount') 

    const updatedBeneficiary = await beneficiary.updateOne(
      { balance: beneficiary.balance + +amount },
      { new: true }
    );

    const newTransfer = await Txn.buildTxn({
      amount,
      beneficiary: beneficiary.id,
      account: account.id,
      status: TxnStatusEnum.Success,
      type: TxnTypeEnum.Transfer,
      reason: reason || ''
    });

    await new TxnTransferPublisher(natsWrapper.client).publish({
      id: newTransfer.id,
      version: newTransfer.version,
      amount: newTransfer.amount,
      account: {
        id: updatedAccount.id,
        userId: updatedAccount.user.id,
        balance: updatedAccount.balance,
        version: updatedAccount.version
      },

      beneficiary: {
        id: updatedBeneficiary.id,
        userId: updatedBeneficiary.user.id,
        balance: updatedBeneficiary.balance,
        version: updatedBeneficiary.version
      }
    });

    res.status(201).json({ status: 'success', data: newTransfer });
  }
);

export { router as createTransferRouter };
