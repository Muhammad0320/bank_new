import cors from 'cors';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import express, { Response } from 'express';
import { signoutRouter } from './routes/signout';
import { updateUserRouter } from './routes/update';
import { createUserRouter } from './routes/signup';
import { currentUserRouter } from './routes/currentUser';
import { passwordUpdateRouter } from './routes/updatesPassword';
import { globalErrorHandler, NotFound } from '@m0banking/common';
import { signinWithEmailRouter } from './routes/signinWithEmail';

const app = express();

app.set('trust proxy', true);

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    httpOnly: true,
    signed: false,
    secure: false
  })
);

console.log('Hi mom');

const rootUrl = '/api/v1/user';

app.get(rootUrl, (req, res: Response) => {
  res.status(200).json({
    message: 'Allihamdullilah'
  });
});

app.use(rootUrl, signoutRouter);
app.use(rootUrl, createUserRouter);
app.use(rootUrl, updateUserRouter);
app.use(rootUrl, currentUserRouter);
app.use(rootUrl, passwordUpdateRouter);
app.use(rootUrl, signinWithEmailRouter);

app.all('*', () => {
  throw new NotFound('Route not found');
});

app.use(globalErrorHandler);

export { app };
