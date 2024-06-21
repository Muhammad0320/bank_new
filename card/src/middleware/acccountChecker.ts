import { NextFunction, Request, Response } from 'express';
import { Account } from '../model/Account';
import {
  AccountStatus,
  BadRequest,
  Forbidden,
  NotFound,
  UserRole
} from '@m0banking/common';
import { Card } from '../model/card';

export const accountChecker = (type?: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let account;

  if (type === 'new') account = await Account.findById(req.body.accountId);

  if (!type) {
    const card = await Card.findById(req.params.id).populate('account');

    if (!card) throw new NotFound('Card not found');

    account = card.account;
  }

  if (!account) throw new NotFound('Account not found');

  if (
    account.user.id !== req.currentUser.id &&
    req.currentUser.role === UserRole.User
  )
    throw new Forbidden('You are not allowed to perform this action');

  if (account.status !== AccountStatus.Active)
    throw new BadRequest('This account is not active');

  next();
};
