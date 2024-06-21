import { Card } from '../model/card';
import { CardStatus } from '../enums/CardStatus';
import express, { Request, Response } from 'express';
import {
  BadRequest,
  NotFound,
  paramsChecker,
  requireAuth
} from '@m0banking/common';
import { natsWrapper } from '../natswrapper';
import { accountChecker } from '../middleware/acccountChecker';
import { CardBlockedPublisher } from '../events/publisher/CardBlockedPublisher';

const router = express.Router();

router.patch(
  '/:id/block',
  requireAuth,
  paramsChecker('id'),
  accountChecker(),
  async (req: Request, res: Response) => {
                                           const card = await Card.findById(
                                             req.params.id
                                           );

                                           if (!!!card)
                                             throw new NotFound(
                                               'Card not found'
                                             );

                                           if (
                                             card.info.status ===
                                             CardStatus.Blocked
                                           )
                                             throw new BadRequest(
                                               'Card already blocked'
                                             );

                                           const updatedCard = await Card.updateOne(
                                             {
                                               info: {
                                                 status: CardStatus.Active
                                               }
                                             },
                                             { new: true }
                                           );

                                           await new CardBlockedPublisher(
                                             natsWrapper.client
                                           ).publish({
                                             id: card.id,
                                             version: card.version + 1,
                                             reason: 'shit',
                                             user: card.user
                                           });

                                           res
                                             .status(200)
                                             .json({
                                               status: 'sucess',
                                               data: updatedCard
                                             });
                                         }
);

export { router as cardBlockedRouter };
