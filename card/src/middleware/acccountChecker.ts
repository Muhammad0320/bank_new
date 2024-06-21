import { NextFunction, Request, Response } from 'express';
import { Account } from '../model/Account';
import { AccountStatus, BadRequest, NotFound } from '@m0banking/common';
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

    console.log(card, 'card from  the new middlware ------------');

    if (!card) throw new NotFound('Card not found');

    account = card.account;
  }

  if (!account) throw new NotFound('Account not found');

  if (account.status !== AccountStatus.Active)
    throw new BadRequest('This account is not active');

  next();
};

