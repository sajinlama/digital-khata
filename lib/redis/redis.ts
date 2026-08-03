import { Redis } from '@upstash/redis';

let redis: Redis;

try {
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  console.log('Redis client initialized successfully');
} catch (error) {
  console.error('Failed to initialize Redis client:', error);
  throw error;
}

export { redis };
export default redis;      