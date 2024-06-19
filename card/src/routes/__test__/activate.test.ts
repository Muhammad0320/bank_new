import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { CardType } from '../../enums/CardType';
import { accountBuilder } from '../../test/builders';
import { CardNetwork } from '../../enums/CardNewtwork';

it(' returns a 401 for unauthenticated requests ', async () => {
  await request(app)
    .patch('/api/v1/card/shitid/activate')
    .send()
    .expect(401);
});

it('returns a 400 for invalid card ', async () => {
  await request(app)
    .patch('/api/v1/card/shitid/activate')
    .set('Cookie', await global.signin())
    .send()
    .expect(400);
});

it('retuns a 404 if the id does not match any existing card', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app)
    .patch(`/api/v1/card/${id}/activate`)
    .set('Cookie', await global.signin())
    .send()
    .expect(404);
});

it('returns a 200 when everyting is valid ', async () => {
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
    .patch(`/api/v1/card/${data.id}/activate`)
    .set('Cookie', await global.signin())
    .send()
    .expect(200);
});
