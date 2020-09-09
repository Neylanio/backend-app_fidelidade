import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../models/User';
import Customer from '../models/Customer';
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
  }: Request): Promise<Response | undefined> {

    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({ email });

    const checkUsernameExists = await userRepository.findOne({ username });

    const validation = Yup.object().shape({
      username: Yup.string().required('Username é obrigatório'),
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
    });

    await validation.validate({email, username, password}, {
      abortEarly: false,
    });

    if (checkEmailExists) throw new AppError('Email já usado. Por favor faça o Logon!', 401);

    if (checkUsernameExists) throw new AppError('Username não está disponível. Tente outro!', 401);

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
