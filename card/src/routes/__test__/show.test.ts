import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

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


