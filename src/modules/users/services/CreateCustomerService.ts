import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import * as Yup from 'yup';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';

interface Request {
  email: string;
  username: string;
  password: string;
  avatar: string;
  surname: string;
  whatsapp: string;
}

@injectable()
class CreateCustomerService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ){}

  public async execute({
    email,
    username,
    password,
    avatar,
    surname,
    whatsapp,
  }: Request): Promise<User> {

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

    const newPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      username,
      password: newPassword,
      type: 'customer',
      avatar,
      surname,
      whatsapp,
      type_employee: '',
      active: '1',
    });

    return user;
  }
}

export default CreateCustomerService;
