import { NextFunction, Request, Response } from 'express';
import { Account } from '../model/Account';
import { AccountStatus, BadRequest, NotFound } from '@m0banking/common';

export const accountChecker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const account = await Account.findById(req.body.accountId);

  if (!account) throw new NotFound('Account not found');

  if (account.status !== AccountStatus.Active)
    throw new BadRequest('This account is not active');

  next();
};
