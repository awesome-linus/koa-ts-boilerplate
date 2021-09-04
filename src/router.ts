import Router from 'koa-router';
import { ParsedUrlQuery } from 'querystring';
import isUndefined from 'lodash/isUndefined';
import { knex } from './knex';

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

interface FetchUsersRequestQuery extends ParsedUrlQuery{
  first: string;
  offset: string;
  fields: string;
}

interface User {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

router.get('/api/users', async (ctx, next) => {
  const { first, offset, fields } = <FetchUsersRequestQuery>ctx.request.query;

  const users = knex('users');

  if (!isUndefined(fields) && fields !== '') {
    users.select(fields?.split(',') as string[]);
  } else {
    users.select('*');
  }
  if (Number(offset) > 0) {
    users.offset(Number(offset));
  }
  if (Number(first) > 0) {
    users.limit(Number(first));
  } else {
    users.limit(10);
  }
  ctx.body = await users;

  await next();
});

interface FetchUserRequestQuery extends ParsedUrlQuery{
  fields: string;
}
interface FetchUserRequestParams extends Record<string, string> {
  userId: string;
}

router.get('/api/users/:userId', async (ctx, next) => {
  const { userId } = <FetchUserRequestParams>ctx.params;
  const { fields } = <FetchUserRequestQuery>ctx.request.query;

  const users = knex<User>('users')
    .where('id', userId)
    .first();

  if (!isUndefined(fields) && fields !== '') {
    users.select(fields?.split(',') as string[]);
  } else {
    users.select('*');
  }
  ctx.body = await users;

  await next();
});

interface PostUserRequestBody {
  email: string;
  passowrd: string;
}

router.post('/api/users', async (ctx, next) => {
  const body = <PostUserRequestBody>ctx.request.body;
  const userId = await knex<User>('users')
    .insert(body);

  ctx.body = await knex<User>('users')
    .where('id', userId)
    .first();
  ctx.status = 201;

  await next();
});

export default router;
