import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import router from '~/router';
import { koaException } from '~/koa-exception';

const app = new Koa();

// Middlewares
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(koaException);

// Routes
app.use(router.routes()).use(router.allowedMethods());

export default app;
