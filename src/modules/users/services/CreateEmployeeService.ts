import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/CacheProvider/models/ICacheProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  type_employee: string;
  whatsapp: string;
  avatar: string;
}

@injectable()
class CreateEmployeeService {
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
    surname,
    type_employee,
    avatar,
    whatsapp,
  }: Request): Promise<User> {
    const checkEmailExists = await this.usersRepository.findByMail(email);

    const checkUsernameExists = await this.usersRepository.findByUsername(
      username,
    );

    if (checkEmailExists)
      throw new AppError('Email já registrado. Por favor faça o Login!', 401);

    if (checkUsernameExists)
      throw new AppError('Username não está disponível. Tente outro!', 401);

    if (type_employee !== 'common' && type_employee !== 'manager') {
      throw new AppError('Tipo de funcionário inválido!');
    }

    const newPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      email,
      username,
      password: newPassword,
      surname,
      type: 'employee',
      type_employee,
      avatar,
      whatsapp,
      active: '1',
    });

    await this.cacheProvider.invalidatePrefix('employees:*');

    return user;
  }
}

export default CreateEmployeeService;
