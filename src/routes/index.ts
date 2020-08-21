import { Router } from 'express';
import customersRouter from './customers.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/users', usersRouter);

export default routes;
