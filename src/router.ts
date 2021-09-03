import Router from 'koa-router';

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

export default router;
