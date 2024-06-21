import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { accountBuilder } from '../../test/builders';
import { CardNetwork, CardType, UserRole } from '@m0banking/common';

it('returns a 401, for invalid request', async () => {
  await request(app)
    .get('/api/v1/card/shitid')
    .send()
    .expect(401);
});

it('returns a 400 for invalid mongoose id', async () => {
  await request(app)
    .get('/api/v1/card/shitid')
    .set('Cookie', await global.signin())
    .send()
    .expect(400);
});

it('returns a 400 if the card id provided is valid but does not match any in the db', async () => {
  await request(app)
    .get('/api/v1/card/' + new mongoose.Types.ObjectId().toHexString())
    .set('Cookie', await global.signin())
    .send()
    .expect(400);
});

it('returns a 403 for anauthorized user', async () => {
  const account = await accountBuilder();

  const {
    body: { data }
  } = await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);

  await request(app)
    .get('/api/v1/card' + data.id)
    .set('Cookie', await global.signin())
    .send()
    .expect(403);
});


it('returns a 200 if it is an admin', async () => {
  const account = await accountBuilder();

  const {
    body: { data }
  } = await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);

  await request(app)
    .get('/api/v1/card' + data.id)
    .set('Cookie', await global.signin(undefined, UserRole.Admin))
    .send()
    .expect(200);
});




it('returns a 200 for authorized user', async () => {
  const account = await accountBuilder();

  const {
    body: { data }
  } = await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);

  await request(app)
    .get('/api/v1/card' + data.id)
    .set('Cookie', await global.signin(account.user.id))
    .send()
    .expect(200);
});