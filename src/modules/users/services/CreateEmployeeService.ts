import { inject, injectable } from 'tsyringe';
import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  type_employee: 'common' | 'manager';
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
  ){}

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

    const checkUsernameExists = await this.usersRepository.findByUsername(username);

    const validation = Yup.object().shape({
      username: Yup.string().required('Username é obrigatório'),
      email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
      password: Yup.string().min(6, 'Senha deve ter no mínimo 6 dígitos'),
    });

    await validation.validate({email, username, password}, {
      abortEarly: false,
    });

    if (checkEmailExists) throw new AppError('Email já registrado. Por favor faça o Login!', 401);

    if (checkUsernameExists) throw new AppError('Username não está disponível. Tente outro!', 401);

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

    return user;
  }
}

export default CreateEmployeeService;
