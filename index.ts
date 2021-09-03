import Koa from 'koa';
import Router from 'koa-router';

import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';

const app = new Koa();
const router = new Router();

// Hello world
router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Hello world!' };

  await next();
});

interface HelloRequest {
  name: string;
}

// Hello world
router.post('/', async (ctx, next) => {
  const { name } = <HelloRequest>ctx.request.body;
  ctx.body = { name };
  await next();
});

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  // eslint-disable-next-line
  console.info('Koa started');
});
