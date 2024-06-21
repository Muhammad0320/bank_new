import request from 'supertest';
import { app } from '../../app';

it('returns a 401, for invalid request', async () => {
  await request(app)
    .get('/api/v1/card/shitid')
    .send()
    .expect(401);
});

it('returns a 400 for invalid mongoose id', async () => {});
