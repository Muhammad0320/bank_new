import { Card } from '../model/card';
import { CardStatus } from '../enums/CardStatus';
import express, { Request, Response } from 'express';
import {
  BadRequest,
  CryptoManager,
  NotFound,
  paramsChecker,
  requireAuth
} from '@m0banking/common';
import { check } from 'express-validator';
import { natsWrapper } from '../natswrapper';
import { accountChecker } from '../middleware/acccountChecker';
import { CardBlockedPublisher } from '../events/publisher/CardBlockedPublisher';

const router = express.Router();

router.patch(
  '/:id/block',
  requireAuth,
  paramsChecker('id'),
  accountChecker(),
  [
    check('pin')
      .isInt({ min: 4, max: 4 })
      .withMessage('Please provide a valid pin')
  ],
  async (req: Request, res: Response) => {
    const card = await Card.findById(req.params.id);

    if (!!!card) throw new NotFound('Card not found');

    const isCorrectPin = await CryptoManager.compare(
      card.account.pin,
      '' + req.body.pin
    );

    if (!isCorrectPin) throw new BadRequest(' Wrong pin, try again ');

    if (card.info.status === CardStatus.Blocked)
      throw new BadRequest('Card already blocked');

    const updatedCard = await Card.updateOne(
      {
        info: {
          status: CardStatus.Active
        }
      },
      { new: true }
    );

    await new CardBlockedPublisher(natsWrapper.client).publish({
      id: card.id,
      version: card.version + 1,
      reason: 'shit',
      user: card.user
    });

    res.status(200).json({
      status: 'sucess',
      data: updatedCard
    });
  }
);

export { router as cardBlockedRouter };
