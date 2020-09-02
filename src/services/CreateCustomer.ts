import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import Customer from '../models/Customer';
import { validationEmail, validationPassword } from '../utils/User/validations';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  whatsapp: string;
}

interface Response {
  id: string;
  email: string;
  username: string;
  type: string;
  surname: string;
  whatsapp: string;
  user_id: string;
}

class CreateCustomerService {
  public async execute({
    email,
    username,
    password,
    surname,
    whatsapp,
  }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({ email });

    const checkUsernameExists = await userRepository.findOne({ username });

    const retornoEmail = await validationEmail.validateAsync({ email });
    const retornoPassword = await validationPassword.validateAsync({
      password,
    });

    if (checkEmailExists) throw new AppError('Email address already used', 401);

    if (checkUsernameExists) throw new AppError('Username already used', 401);

    if (retornoEmail === false) {
      throw new AppError('Invalid email');
    }

    if (retornoPassword === false) {
      throw new AppError('Invalid password');
    }

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      username,
      password: newPassword,
      active: '1',
      type: 'customer',
    });

    const userId = await userRepository.save(user);

    const customerRepository = getRepository(Customer);

    const customer = customerRepository.create({
      surname,
      whatsapp,
      active: '1',
      user_id: userId.id,
    });

    const customer_id = await customerRepository.save(customer);

    return {
      id: customer_id.id,
      email,
      username,
      type: userId.type,
      surname,
      whatsapp,
      user_id: userId.id,
    };
  }
}

export default CreateCustomerService;
