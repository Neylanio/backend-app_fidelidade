import { Router, request, response } from 'express';
import customersRouter from './customers.routes';

const routes = Router();

routes.get('/', (request, response) => {
  return response.json({ok: true})
});
routes.use('/clientes', customersRouter);

export default routes;