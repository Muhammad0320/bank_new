import { NotFound, paramsChecker, requireAuth } from '@m0banking/common';
import express, { Request, Response } from 'express';
import { CardStatus } from '../enums/CardStatus';
import { Card } from '../model/card';
import { CardActivatedPublisher } from '../events/publisher/CardActivatedPublisher';
import { natsWrapper } from '../natswrapper';
import { accountChecker } from '../middleware/acccountChecker';

const router = express.Router();

router.patch(
  '/:id/activate',
  requireAuth,
  paramsChecker('id'),
  accountChecker(),
  async (req: Request, res: Response) => {
    const card = await Card.findById(req.params.id);

    if (!card) throw new NotFound('Card not found');

    const activatedCard = await card.updateOne(
      {
        info: {
          status: CardStatus.Active
        }
      },
      { new: true }
    );

    await new CardActivatedPublisher(natsWrapper.client).publish({
      id: card.id,
      version: card.version + 1,
      user: card.user
    });

    res.status(200).json({
      status: 'sucess',
      data: activatedCard
    });
  }
);

export { router as cardActivatedRouter };
