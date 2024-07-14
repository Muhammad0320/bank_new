import express, { Request, Response } from 'express';
import { NotFound, paramsChecker, requireAuth } from '@m0banking/common';
import { accountChecker } from '../middleware/acccountChecker';
import { Card } from '../model/card';

const router = express.Router();

router.get(
  '/:id',
  requireAuth,
  paramsChecker('id'),
  accountChecker(),
  async (req: Request, res: Response) => {
    const card = await Card.findById(req.params.id);

    if (!card) throw new NotFound(' Card not found ');

    res.status(200).json({
      status: 'success',
      data: { ...card, decryptedInfo: card.decryptedInfo }
    });
  }
);

export { router as showCardRouter };
