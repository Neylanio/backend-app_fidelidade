import { Router } from 'express';
import customersRouter from './customers.routes';
import employeesRouter from './employees.routes';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/customers', customersRouter);
routes.use('/employees', employeesRouter);

export default routes;
