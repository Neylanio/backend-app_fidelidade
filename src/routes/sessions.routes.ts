import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { login, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    login,
    password,
  });

  delete user.password;
  delete user.updated_at;
  return response.json({ user, token });
});
export default sessionsRouter;
