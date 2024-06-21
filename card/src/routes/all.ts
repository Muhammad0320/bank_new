import { accessibleTo, requireAuth, UserRole } from '@m0banking/common';
import express, { NextFunction, Request, Response } from 'express';
import { Card } from '../model/card';

const router = express.Router();

router.get(
  '/',
  requireAuth,
  accessibleTo(UserRole.Admin),
  async (req: Request, res: Response) => {
    const cards = await Card.find({});

    res.status(200).json({ status: 'success', data: cards });
  }
);

export { router as getAllCardRouter };
