import Router from 'koa-router';
import { fetchUser, fetchUserAll, createUser } from '~/controllers/UserController';

const router = new Router();

router.get('/healthCheck', async (ctx, next) => {
  ctx.body = { healthCheck: 'ok' };
  await next();
});

router.get('/api/users', fetchUserAll);
router.get('/api/users/:userId', fetchUser);
router.post('/api/users', createUser);

export default router;
