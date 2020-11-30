import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';

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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    email,
    username,
    password,
    avatar,
    surname,
    whatsapp,
  }: Request): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByMail(email);

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkEmailExists)
      throw new AppError('Email já usado. Por favor faça o Logon!', 401);

    if (checkUsernameExists)
      throw new AppError('Username não está disponível. Tente outro!', 401);

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

    await this.cacheProvider.invalidatePrefix('customers:*');

    return user;
  }
}

export default CreateCustomerService;
