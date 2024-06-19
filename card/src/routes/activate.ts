import { Card } from '../model/card';
import { CardStatus } from '../enums/CardStatus';
import express, { Request, Response } from 'express';
import {
  BadRequest,
  NotFound,
  paramsChecker,
  requireAuth
} from '@m0banking/common';

const router = express.Router();

router.patch(
  '/:id/activate',
  requireAuth,
  paramsChecker('id'),
  async (req: Request, res: Response) => {
    const card = await Card.findById(req.params.id);

    if (!card) throw new NotFound('Card not found');

    const activatedCard = await card.updateOne(
      { info: { status: CardStatus.Active } },
      { new: true }
    );

    if (!activatedCard) throw new BadRequest('Something bad happened');

    res.status(200).json({ status: 'sucess', data: card });
  }
);

export { router as cardActivatedRouter };
