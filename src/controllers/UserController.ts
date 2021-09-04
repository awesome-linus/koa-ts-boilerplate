import isUndefined from 'lodash/isUndefined';
import { ParameterizedContext, Next } from 'koa';
import Router from 'koa-router';
import { knex } from '../knex';
import { User } from '../domain/user';
import {
  FetchUsersRequestQuery,
  FetchUserRequestQuery,
  FetchUserRequestParams,
  PostUserRequestBody,
} from './request.d.ts/user';

export const fetchUserAll = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
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
};

export const fetchUser = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
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
};

export const createUser = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
  const body = <PostUserRequestBody>ctx.request.body;
  const userId = await knex<User>('users')
    .insert(body);

  ctx.body = await knex<User>('users')
    .where('id', userId)
    .first();
  ctx.status = 201;

  await next();
};
