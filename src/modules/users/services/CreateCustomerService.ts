import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
  username: string;
  password: string;
  avatar: string;
  surname: string;
  whatsapp: string;
}

interface Response {
  id: string;
  email: string;
  username: string;
  avatar: string;
  type: string;
  surname: string;
  whatsapp: string;
  active: '1' | '0';
}

@injectable()
class CreateCustomerService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({
    email,
    username,
    password,
    avatar,
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
      type: 'customer',
      avatar,
      surname,
      whatsapp,
      type_employee: '',
      active: '1',
    });

    return {
      id: user.id,
      email,
      username,
      avatar,
      type: user.type,
      surname,
      whatsapp,
      active: user.active,
    };
  }
}

export default CreateCustomerService;
