import { Router } from 'express';

const adminRouter = Router();

adminRouter.get('/establishments', async (request, response) => {
  return response.json({ message: true });
});

adminRouter.get('/establishments/employees', async (request, response) => {
  return response.json({ message: true });
});

adminRouter.get('/establishments/promotions', async (request, response) => {
  return response.json({ message: true });
});

adminRouter.get('/establishments/customers', async (request, response) => {
  return response.json({ message: true });
});

export default adminRouter;
