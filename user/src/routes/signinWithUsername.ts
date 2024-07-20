import express, { Request, Response } from 'express';
import { passwordValidator, usernameValidator } from '../services/validators';
import { BadRequest, CryptoManager, requestValidator } from '@m0banking/common';
import User from '../model/user';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/signin/username',
  [usernameValidator(), passwordValidator()],
  requestValidator,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUSer = await User.findOne({ username }).select('+password');

    if (!!!existingUSer) throw new BadRequest('Invalid signin credentials');

    const isCorrectPassword = await CryptoManager.compare(
      existingUSer.password,
      password
    );

    if (!isCorrectPassword) throw new BadRequest('Invalid signin credentials');

    const token = jwt.sign({ user: existingUSer }, process.env.JWT_KEY!, {
      expiresIn: +process.env.JWT_EXPIRES_IN! * 60 * 60
    });

    req.session = {
      jwt: token
    };

    res.status(200).json({
      status: 'success',
      message: 'Signin succssful',
      data: existingUSer
    });
  }
);

export { router as signinWithUsernameRouter };
