import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import Customer from '../models/Customer';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  whatsapp: string;
}

class CreateCustomerService {
  public async execute({
    email,
    username,
    password,
    surname,
    whatsapp,
  }: Request): Promise<Customer> {
    const userRepository = getRepository(User);

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      username,
      password: newPassword,
      active: '1',
    });

    const userId = await userRepository.save(user);

    const customerRepository = getRepository(Customer);

    const customer = customerRepository.create({
      surname,
      whatsapp,
      active: '1',
      user_id: userId.id,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
