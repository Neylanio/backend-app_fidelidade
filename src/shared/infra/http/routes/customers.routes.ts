import { Router } from 'express';
import CreateCustomerService from '../../services/CreateCustomer';

const customersRouter = Router();

customersRouter.post('/', async (request, response) => {
  const { email, username, password, surname, whatsapp } = request.body;

  const customerService = new CreateCustomerService();

  const customer = await customerService.execute({
    email,
    username,
    password,
    surname,
    whatsapp,
  });

  return response.json(customer);
});

export default customersRouter;
