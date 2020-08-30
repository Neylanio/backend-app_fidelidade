import { Router } from 'express';
import customersRouter from './customers.routes';
import employeesRouter from './employees.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/customers', customersRouter);
routes.use('/employees', employeesRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
