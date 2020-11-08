import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);
export default sessionsRouter;
