import Router from 'express';

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import Customer from '../models/Customer';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { email, username, password, surname, whatsapp } = request.body;

  const userRepository = getRepository(User);

  const newPassword = await hash(password, 8);

  const user = userRepository.create({
    email,
    username,
    password: newPassword,
    active: '1',
  });

  try {
    const userId = await userRepository.save(user);

    const customerRepository = getRepository(Customer);

    const customer = customerRepository.create({
      surname,
      whatsapp,
      active: '1',
      user_id: userId.id,
    });

    await customerRepository.save(customer);

    return response.send();
  } catch (error) {
    return response.status(401).json({ message: 'Error' });
  }
});

export default usersRouter;
