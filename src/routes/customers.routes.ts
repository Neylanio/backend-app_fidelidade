import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateCustomerService from '../services/CreateCustomer';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const customersRouter = Router();

customersRouter.get('/', ensureAuthenticated, async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.customer', 'customer')
    .select([
      'user.id',
      'user.email',
      'user.username',
      'user.active',
      'user.created_at',
      'user.updated_at',
      'customer.id',
      'customer.surname',
      'customer.whatsapp',
    ])
    .getMany();

  return response.json(users);
});

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
