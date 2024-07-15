import Queue from 'bull';

interface Payload {
  cardId: string;
}

export const cardExpirationQueue = new Queue<Payload>('card:expiration', {
  redis: { host: process.env.REDIS_HOST! }
});
