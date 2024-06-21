import request from 'supertest';
import { app } from '../../app';
import { CardNetwork, CardType, UserRole } from '@m0banking/common';
import { accountBuilder } from '../../test/builders';

it(' returns a 401 for unauthrized acces ', async () => {
  await request(app)
    .get('/api/v1/card')
    .send()
    .expect(401);
});


it('returns a 403, if just ordinary user is not an admin ', async () => {
  await request(app)
    .get('/api/v1/card')
    .set('Cookie', await global.signin())
    .send()
    .expect(403);
});

it('returns a 200 on for admins', async () => {
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

  const {
    body: { data }
  } = await request(app)
    .get('/api/v1/card')
    .set('Cookie', await global.signin(undefined, UserRole.Admin))
    .send()
    .expect(200);

  expect(data.length).toEqual(1);
});
