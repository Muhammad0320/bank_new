import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';

import { currentUser, globalErrorHandler, NotFound } from '@m0banking/common';
import { cardActivatedRouter } from './routes/activate';
import { cardBlockedRouter } from './routes/block';
import { cardCreatedRouter } from './routes/new';
import { cardUpdateRouter } from './routes/settings';

const app = express();

app.set('trust proxy', true);

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

const rootUrl = '/api/v1/card';

app.use(currentUser);
app.use(rootUrl, cardCreatedRouter);
app.use(rootUrl, cardUpdateRouter);
app.use(rootUrl, cardBlockedRouter);
app.use(rootUrl, cardActivatedRouter);

app.all('*', () => {
  throw new NotFound('Route not found');
});

app.use(globalErrorHandler);

export { app };
