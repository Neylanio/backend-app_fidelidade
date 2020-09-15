import { Router } from 'express';

const establishmentRouter = Router();

establishmentRouter.get('/establishments', async (request, response) => {
  return response.json({ message: true });
});

export default establishmentRouter;
