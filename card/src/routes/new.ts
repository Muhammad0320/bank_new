import {
  AccountStatus,
  BadRequest,
  Forbidden,
  NotFound,
  requestValidator,
  requireAuth,
  UserRole
} from '@m0banking/common';
import {
  accountValidator,
  billingAddressValidator,
  netwokTypeValidator,
  typeValidator
} from '../services/validators';
import { Card } from '../model/card';
import { Account } from '../model/Account';
import express, { Response, Request } from 'express';

const router = express.Router();

router.post(
  '/',
  requireAuth,
  [
    accountValidator(),
    billingAddressValidator(),
    netwokTypeValidator(),
    typeValidator()
  ],
  requestValidator,
  async (req: Request, res: Response) => {
    const { accountId, billingAddress, networkType, type } = req.body;

    const account = await Account.findById(accountId).populate('user');

    if (!!!account) throw new NotFound('Account not found');

    if (account.status === AccountStatus.Blocked)
      throw new BadRequest('Cannot create Card with a blocked account');

    if (req.currentUser.id !== account.user.id)
      throw new Forbidden(
        'You are not allowed to create card for another user'
      );

    const newCard = await Card.buildCard({
      account: accountId,
      billingAddress,
      networkType,
      type,
      user: {
        id: account.user.id,
        name: account.user.name
      }
    });

    res.status(201).json({
      status: 'success',

      message:
        'Card Successfully created. Head over to the `/activate`, for card activation',
      data: newCard
    });
  }
);

export { router as cardCreatedRouter };
