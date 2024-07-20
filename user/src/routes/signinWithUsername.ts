import express, { Request, Response } from 'express';
import { passwordValidator, usernameValidator } from '../services/validators';
import { requestValidator } from '@m0banking/common';

const router = express.Router();

router.post(
  '/signin/username',
  [usernameValidator(), passwordValidator()],
  requestValidator,
  async (req: Request, res: Response) => {}
);

export { router as signinWithUsernameRouter };
