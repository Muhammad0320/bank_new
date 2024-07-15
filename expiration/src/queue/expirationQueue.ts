import Queue from 'bull';
import { CardExpirationPublisher } from '../events/publisher/CardExpirationPublisher';
import { natsWrapper } from '../../natswrapper';

interface Payload {
  cardId: string;
}

export const cardExpirationQueue = new Queue<Payload>('card:expiration', {
  redis: { host: process.env.REDIS_HOST! }
});


cardExpirationQueue.process(async job => {
  await new CardExpirationPublisher(natsWrapper.client).publish({
    cardId: job.data.cardId
  });
});

