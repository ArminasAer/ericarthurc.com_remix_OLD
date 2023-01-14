import { Post } from '@prisma/client';
import { createClient } from 'redis';
import { getPostsPrisma } from './models/post.server';

const redisClient = createClient();

// currently crashing the whole app on error
// maybe we can fallback to prisma if redis errors
redisClient.on('error', (err) => {
  console.log('redis error', err);
  process.exit(1);
});

export async function redisStartupCache() {
  await redisClient.connect();

  const posts = await getPostsPrisma();

  await redisClient.set('post_cache', JSON.stringify(posts));

  const cache = await redisClient.get('post_cache');

  if (cache) {
    console.log('💾 server startup: posts cached in redis');
  }

  await redisClient.disconnect();
}

export async function getPostCacheParsed() {
  await redisClient.connect();

  const cache = await redisClient.get('post_cache');

  await redisClient.disconnect();

  if (cache) {
    return JSON.parse(cache) as Post[];
  }

  return [];
}

export default redisClient;
