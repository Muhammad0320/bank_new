import request from 'supertest';
import { app } from '../../app';

it(' returns a 401 for unauthrized acces ', async () => {
  await request(app)
    .get('/api/v1/card')
    .send()
    .expect(401);
});
