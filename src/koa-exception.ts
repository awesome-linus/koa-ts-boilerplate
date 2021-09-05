import { ParameterizedContext, Next } from 'koa';
import { retrieveHttpError } from '~/exception/http/retrieveHttpError';

export const koaException = async (ctx: ParameterizedContext, next: Next) => {
  try {
    await next();
  } catch (err: any) {
    const e = retrieveHttpError(err);

    ctx.status = e.status;
    ctx.body = {
      error: {
        code: e.status,
        message: e.message,
        errors: [],
      },
    };
  }
};
