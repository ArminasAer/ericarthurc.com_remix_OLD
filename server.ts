import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import { createRequestHandler } from '@remix-run/express';

import { redisStartupCache } from './app/redis.server';

const BUILD_DIR = path.join(process.cwd(), 'build');

redisStartupCache();

const app = express();

app.use(compression());

app.disable('x-powered-by');

app.use(
  '/build',
  express.static('public/build', { immutable: true, maxAge: '1y' })
);

app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.all(
  '*',
  process.env.NODE_ENV === 'development'
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
      })
);
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

function purgeRequireCache() {
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
