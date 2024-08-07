import jwt from 'jsonwebtoken';

import express, { Request, Response } from 'express';
import {
  BadRequest,
  CryptoManager,
  emailValidator,
  passwordValidator,
  requestValidator
} from '@m0banking/common';
import User from '../model/user';

const router = express.Router();

router.post(
  '/signin/email',

  [emailValidator(), passwordValidator()],

  requestValidator,

  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) {
      throw new BadRequest('Invalid signin credentials ');
    }

    const isCorrectPassword = await CryptoManager.compare(
      existingUser.password,
      password
    );

    if (!isCorrectPassword) {
      throw new BadRequest('Invalid signin credentials');
    }

    const token = jwt.sign({ user: existingUser }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
    });

    req.session = {
      jwt: token
    };

    await existingUser.updateOne({
      signinTimeStamps: [...existingUser.signinTimeStamps, new Date()]
    });

    res.status(200).json({ status: 'success', data: existingUser });
  }
);

export { router as signinWithEmailRouter };
