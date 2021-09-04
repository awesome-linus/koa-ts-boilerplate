import Router from 'koa-router';
import { ParsedUrlQuery } from 'querystring';
import isUndefined from 'lodash/isUndefined';
import { knex } from './knex';

const router = new Router();

router.get('/healthCheck', async (ctx, next) => {
  ctx.body = { healthCheck: 'ok' };
  await next();
});

interface FetchUsersRequestQuery extends ParsedUrlQuery{
  limit: string;
  offset: string;
  sort: string; // ASC: sort=updated_at, DESC: sort=-updated_at
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
  const {
    limit,
    offset,
    sort,
    fields,
  } = <FetchUsersRequestQuery>ctx.request.query;

  const users = knex('users');

  if (!isUndefined(fields) && fields !== '') {
    users.select(fields?.split(',') as string[]);
  } else {
    users.select('*');
  }
  if (Number(offset) > 0) {
    users.offset(Number(offset));
  }
  if (Number(limit) > 0) {
    users.limit(Number(limit));
  } else {
    users.limit(10);
  }

  if (!isUndefined(sort) && sort !== '' && sort.length > 0) {
    if (sort.slice(0, 1) === '-') {
      const sortKey = sort.slice(1, sort.length);
      users.orderBy(sortKey, 'desc');
    } else {
      users.orderBy(sort, 'asc');
    }
  } else {
    users.orderBy('updated_at', 'desc');
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
