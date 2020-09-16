import { Router } from 'express';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const adminRouter = Router();
adminRouter.use(ensureAuthenticated);

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
