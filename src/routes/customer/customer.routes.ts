import { Router } from 'express';

const customerRouter = Router();

customerRouter.get('/establishments', async (request, response) => {
  return response.json({ message: true });
});

export default customerRouter;
