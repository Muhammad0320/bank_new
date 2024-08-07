import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Card } from '../../model/card';
import { CardType } from '../../enums/CardType';
import { AccountStatus } from '@m0banking/common';
import { CardStatus } from '../../enums/CardStatus';
import { accountBuilder } from '../../test/builders';
import { CardNetwork } from '../../enums/CardNewtwork';
import { natsWrapper } from '../../natswrapper';

it('returns a 401 for unauthenticated route access', async () => {
  await request(app)
    .post('/api/v1/card')
    .send({})
    .expect(401);
});

it('retuns a 400, for invalid accountId ', async () => {
  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: 'shit id',
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: '',
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);
});

it('returns a 400, for invalid billingAddress', async () => {
  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: '',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);
});

it('returns a 400, for invalid network type', async () => {
  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50 Balogun gambari compd',
      networkType: 'viso',
      type: CardType.Credit
    })
    .expect(400);

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50 Balogun gambari compd',
      networkType: '',
      type: CardType.Credit
    })
    .expect(400);
});

it('returns a 400, for invalid card type ', async () => {
  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,

      type: 'credo'
    })
    .expect(400);

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: ''
    })
    .expect(400);
});

it('returns a 404 on valid but not matched accountId', async () => {
  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: new mongoose.Types.ObjectId().toHexString(),
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(404);
});


it('returns a 403, if an user tried to create card for another user', async () => {
  const account = await accountBuilder();

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin())
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(403);
});

it('returns a 400, if the provided accountId is blocked', async () => {
  const account = await accountBuilder(
    undefined,
    undefined,
    AccountStatus.Blocked
  );

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);
});

it(' returns a 201 when there is no issue ', async () => {
  const account = await accountBuilder();

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);
});

it(' returns a 400 if user has an unexpired card and tries to create another ', async () => {
  const account = await accountBuilder();

  await request(app)
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
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(400);
});

it('returns a 201, when the existing card has expired', async () => {
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

  const updatedCard = await Card.findByIdAndUpdate(
    data.id,
    {
      info: {
        status: CardStatus.Expired
      }
    },
    {
      new: true
    }
  );

  expect(updatedCard?.info.status).toBe(CardStatus.Expired);

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);
});


it('publishes a card created publisher on succssful card creation ', async () => {
  const account = await accountBuilder();

  await request(app)
    .post('/api/v1/card')
    .set('Cookie', await global.signin(account.user.id))
    .send({
      accountId: account.id,
      billingAddress: 'G50 Balogun gambari compd',
      networkType: CardNetwork.Visa,
      type: CardType.Credit
    })
    .expect(201);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  console.log((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

  expect(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  ).toBeDefined();
});

it('hashes the card no stored in the db', async () => {
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

  const currentCard = await Card.findById(data.id);

  if (!currentCard || !currentCard.decryptedInfo)
    throw new Error('Card not found');

  expect(currentCard.decryptedInfo.no).not.toEqual(data.info.no);
});
