import isUndefined from 'lodash/isUndefined';
import { ParameterizedContext, Next } from 'koa';
import Router from 'koa-router';
import { knex } from '~/knex';
import { User } from '~/domain/user';
import {
  FetchUsersRequestQuery,
  FetchUserRequestQuery,
  FetchUserRequestParams,
  PostUserRequestBody,
  PatchUserRequestQuery,
  DeleteUserRequestQuery,
  FetchUserTasksRequestParams,
} from '~/controllers/request.d.ts/user';
import { retrieveKnexError } from '~/exception/knex/retrieveKnexError';

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

  try {
    ctx.body = await users;
  } catch (error: any) {
    throw retrieveKnexError(error);
  }

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

export const updateUser = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
  const query = <PatchUserRequestQuery>ctx.request.query;
  const userId = await knex<User>('users')
    .where('id', query.id)
    .update(query);

  ctx.body = await knex<User>('users')
    .where('id', userId)
    .first();

  await next();
};

export const deleteUser = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
  const { id } = <DeleteUserRequestQuery>ctx.request.query;
  await knex<User>('users')
    .where('id', id)
    .delete();

  ctx.body = {};
  ctx.status = 204;

  await next();
};

export const fetchUserTasks = async (
  ctx: ParameterizedContext<any, Router.IRouterParamContext, any>,
  next: Next,
) => {
  const { userId } = <FetchUserTasksRequestParams>ctx.params;

  if (!isUndefined(userId) && userId !== '') {
    const userTasks = await knex('users as u')
      .join('tasks as t', 'u.id', '=', 't.user_id')
      .where('u.id', userId)
      .select(
        'u.id as userId',
        'u.email',
        'u.password',
        't.id as taskId',
        't.title',
        't.description',
        't.is_complete',
      );

    const tasks = userTasks.map(ut => {
      return {
        id: ut.taskId,
        title: ut.title,
        description: ut.description,
        is_complete: ut.is_complete,
      };
    });

    ctx.body = {
      id: userTasks[0].userId,
      email: userTasks[0].email,
      password: userTasks[0].password,
      tasks,
    };
  }

  await next();
};
