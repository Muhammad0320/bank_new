import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { CardNetwork } from '../../enums/CardNewtwork';
import { CardType } from '../../enums/CardType';
import { accountBuilder } from '../../test/builders';
import { Card } from '../../model/card';
import { CardStatus } from '../../enums/CardStatus';
import { natsWrapper } from '../../natswrapper';

it('it returns a 401 for unautheticated user', async () => {
  await request(app)
    .patch('/api/v1/card/shit_id/block')
    .send()
    .expect(401);
});

it('returns a 404 if the provided id is not matched w/ any card ', async () => {
  const cardId = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${cardId}/block`)
    .set('Cookie', await global.signin())
    .send()
    .expect(404);
});


it('returns a 400  for invalid pin format', async () => {
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
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin(account.user.id))
    .send({ pin: 125 })
    .expect(400);
});

it('returns a 400  for invalid pin ', async () => {
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
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin(account.user.id))
    .send({ pin: 1235 })
    .expect(400);
});

it('returns a 400 if the card is already blocked ', async () => {
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

  // Assert the changes

  await Card.findByIdAndUpdate(
    data.id,
    { info: { status: CardStatus.Blocked } },
    { new: true }
  );

  await request(app)
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin(account.user.id))
    .send({ pin: 1234 })
    .expect(400);
});


it('returns a 403, for unauthorized user access', async () => {
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
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin())
    .send({ pin: 1234 })
    .expect(403);
});

it('returns a 200, when everything is valid', async () => {
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
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin(account.user.id))
    .send({
      pin: 1234
    })
    .expect(200);
});

it(' publishes a cardBlockedEvent, on successful account blockage', async () => {
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
    .patch(`/api/v1/card/${data.id}/block`)
    .set('Cookie', await global.signin(account.user.id))
    .send({ pin: 1234 })
    .expect(200);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  expect(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  ).toBeDefined();
});
  
