import { NextFunction, Request, Response } from 'express';
import { Account } from '../model/Account';
import { AccountStatus, BadRequest, NotFound } from '@m0banking/common';

export const accountChecker = (type?: string) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let account;

  if (type === 'new') account = await Account.findById(req.body.accountId);

  if (!type) account = await Account.findById(req.params.id);

  if (!account) throw new NotFound('Account not found');

  if (account.status !== AccountStatus.Active)
    throw new BadRequest('This account is not active');

  next();
};

