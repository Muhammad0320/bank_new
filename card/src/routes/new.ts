import {
  BadRequest,
  CardStatus,
  Forbidden,
  requestValidator,
  requireAuth
} from '@m0banking/common';
import express, { Request, Response } from 'express';
import { CardCreatedPublisher } from '../events/publisher/CardCreatedPublisher';
import { accountChecker } from '../middleware/acccountChecker';
import { Account } from '../model/Account';
import { Card } from '../model/card';
import { natsWrapper } from '../natswrapper';
import {
  accountValidator,
  billingAddressValidator,
  netwokTypeValidator,
  typeValidator
} from '../services/validators';

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
  accountChecker('new'),

  async (req: Request, res: Response) => {
    const { accountId, billingAddress, networkType, type } = req.body;

    const account = await Account.findById(accountId).populate('user');

    if (!!!account) return;

    if (req.currentUser.id !== account.user.id)
      throw new Forbidden(
        'You are not allowed to create card for another user'
      );

    const existingCard = await Card.findOne({ account: account.id });

    if (!!existingCard && existingCard.info.status !== CardStatus.Expired)
      throw new BadRequest('You already own an unexpired card');

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

    console.log(newCard, 'This was the newly created card');

    await new CardCreatedPublisher(natsWrapper.client).publish({
      id: newCard.id,
      version: newCard.version,
      account: account.id,
      user: account.user,
      settings: newCard.settings,
      info: newCard.info
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
