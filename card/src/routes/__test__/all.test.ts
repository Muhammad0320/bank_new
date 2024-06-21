import request from 'supertest';
import { app } from '../../app';
import { UserRole } from '@m0banking/common';

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

it('returns a 200 on for admins', async () => {});
