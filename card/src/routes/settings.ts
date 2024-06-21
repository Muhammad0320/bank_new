import {
  NotFound,
  paramsChecker,
  requestValidator,
  requireAuth
} from '@m0banking/common';
import express, { Response, Request } from 'express';
import {
  dailyLimitsValidator,
  monthlyLimitsValidator,
  weeklyLimitsValidator
} from '../services/validators';
import { Card } from '../model/card';
import { CardUpdatedPublisher } from '../events/publisher/CardUpdatedEvent';
import { natsWrapper } from '../natswrapper';
import { accountChecker } from '../middleware/acccountChecker';

const router = express.Router();

router.patch(
  '/:id/settings',
  requireAuth,
  paramsChecker('id'),
  [dailyLimitsValidator(), weeklyLimitsValidator(), monthlyLimitsValidator()],
  requestValidator,
  accountChecker(),
  async (req: Request, res: Response) => {
    const { weekly, monthly, daily } = req.body;

    const card = await Card.findById(req.params.id);

    if (!card) return;

    await card.updateOne(
      {
        settings: {
          dailyLimit: +daily,
          weeklyLimit: +weekly,
          monthlyLimit: +monthly
        }
      },
      { new: true }
    );

    const updatedCard = await Card.findById(card.id);

    await new CardUpdatedPublisher(natsWrapper.client).publish({
      id: card.id,
      version: card.version + 1,
      settings: updatedCard!.settings
    });

    res.status(200).json({
      status: 'success',
      card: updatedCard
    });
  }
);

export { router as cardUpdateRouter };
