import Router from 'koa-router';
import {
  fetchUser,
  fetchUserAll,
  createUser,
  updateUser,
  deleteUser,
  fetchUserTasks,
} from '~/controllers/UserController';

const router = new Router();

router.get('/healthCheck', async (ctx, next) => {
  ctx.body = { healthCheck: 'ok' };
  await next();
});

router.get('/api/users', fetchUserAll);
router.get('/api/users/:userId', fetchUser);
router.post('/api/users', createUser);
router.patch('/api/users', updateUser);
router.delete('/api/users', deleteUser);

// router.get('/api/tasks', fetchTaskAll);
// router.get('/api/tasks/:userId', fetchTask);
// router.post('/api/tasks', createTask);
// router.patch('/api/tasks', updateTask);
// router.delete('/api/tasks', deleteTask);

router.get('/api/users/:userId/tasks', fetchUserTasks);

export default router;
