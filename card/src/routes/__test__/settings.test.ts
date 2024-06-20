import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { CardType } from '../../enums/CardType';
import { accountBuilder } from '../../test/builders';
import { CardNetwork } from '../../enums/CardNewtwork';
import { Card } from '../../model/card';
import { natsWrapper } from '../../natswrapper';

it(' returns a 401 for unauthenticated requests ', async () => {
  await request(app)
    .patch('/api/v1/card/shitid/settings')
    .send()
    .expect(401);
});

it('returns a 400 for invalid card ', async () => {
  await request(app)
    .patch('/api/v1/card/shitid/settings')
    .set('Cookie', await global.signin())
    .send()
    .expect(400);
});

it('returns a 400 on invalid dailyLimit', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 500,
      weekly: 50,
      monthly: 5000
    })
    .expect(400);

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 0,
      weekly: 500,
      monthly: 5000
    })
    .expect(400);
});

it('returns a 400 on invalid weeklyLimit', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 50,
      weekly: 5000,
      monthly: 500
    })
    .expect(400);

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 500,
      weekly: 0,
      monthly: 5000
    })
    .expect(400);
});

it('returns a 400 on invalid monthlyLimit', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 50,
      weekly: 5000,
      monthly: 5
    })
    .expect(400);

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 500,
      weekly: 500,
      monthly: 0
    })
    .expect(400);
});

it('returns a 404 when the provided id does not match any existing card', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 50,
      weekly: 500,
      monthly: 5000
    })
    .expect(404);
});

it('returns 200, when everything is working', async () => {
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
    .patch(`/api/v1/card/${data.id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 500,
      weekly: 5000,
      monthly: 50000
    })
    .expect(200);

  const updatedCard = await Card.findById(data.id);

  expect(updatedCard?.settings.dailyLimit).toEqual(500);
  expect(updatedCard?.settings.weeklyLimit).toEqual(5000);
  expect(updatedCard?.settings.monthlyLimit).toEqual(50000);
});

it('publishes a cardUpdatedEvent, on successful card update', async () => {
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
    .patch(`/api/v1/card/${data.id}/settings`)
    .set('Cookie', await global.signin())
    .send({
      daily: 500,
      weekly: 5000,
      monthly: 50000
    })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  expect(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  ).toBeDefined();
});