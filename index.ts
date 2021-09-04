import app from '~/koa';

const server = app.listen(3000, () => {
  // eslint-disable-next-line
  console.info('Koa started');
});

server.keepAliveTimeout = 10 * 1000;
