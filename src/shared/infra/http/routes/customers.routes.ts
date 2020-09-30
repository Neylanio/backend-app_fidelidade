import { Router } from 'express';
import CustomersController from '@modules/customers/infra/http/controllers/CustomersController';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.post('/', customersController.create);

export default customersRouter;
