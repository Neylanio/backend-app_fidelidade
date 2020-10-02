import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  type_employee: 'common' | 'manager';
  whatsapp: string;
  avatar: string;
}

interface Response {
  id: string;
  email: string;
  username: string;
  surname: string;
  whatsapp: string;
  type: 'customer' | 'employee';
  type_employee: 'common' | 'manager';
  active: '1' | '0';
}

class CreateEmployeeService {
  public async execute({
    email,
    username,
    password,
    surname,
    type_employee,
    avatar,
    whatsapp,
  }: Request): Promise<Response> {
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

    if (type_employee !== 'common' && type_employee !== 'manager') {
      throw new AppError('Tipo de funcionário inválido!');
    }

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
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

    return {
      id: user.id,
      email,
      username,
      surname,
      type: user.type,
      type_employee,
      whatsapp,
      active: user.active,
    };
  }
}

export default CreateEmployeeService;
