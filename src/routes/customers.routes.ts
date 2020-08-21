import Router, { json } from 'express';

import { getRepository } from 'typeorm';

const customersRouter = Router();

customersRouter.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default customersRouter;
