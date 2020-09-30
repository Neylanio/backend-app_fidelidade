import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import ICustomersRepository from '../repositories/ICustomersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

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

@injectable()
class CreateCustomerService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ){}

  public async execute({
    email,
    username,
    password,
    surname,
    whatsapp,
  }: Request): Promise<Response | undefined> {

    const checkEmailExists = await this.usersRepository.findByMail(email);

    const checkUsernameExists = await this.usersRepository.findByUsername(username);

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

    const user = await this.usersRepository.create({
      email,
      username,
      password: newPassword,
      active: '1',
      type: 'customer',
    });

    const customer = await this.customersRepository.create({
      surname,
      whatsapp,
      active: '1',
      user_id: user.id,
    });

    return {
      id: customer.id,
      email,
      username,
      type: user.type,
      surname,
      whatsapp,
      user_id: user.id,
    };
  }
}

export default CreateCustomerService;
