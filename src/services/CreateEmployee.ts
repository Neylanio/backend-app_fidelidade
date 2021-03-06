import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import User from '../models/User';
import Employee from '../models/Employee';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  type: 'common' | 'manager';
}

interface Response {
  id: string;
  email: string;
  username: string;
  surname: string;
  type: string;
  type_employee: 'common' | 'manager';
  user_id: string;
}

class CreateEmployeeService {
  public async execute({
    email,
    username,
    password,
    surname,
    type,
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

    if (type !== 'common' && type !== 'manager') {
      throw new AppError('Tipo de funcionário inválido!');
    }

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      username,
      password: newPassword,
      active: '1',
      type: 'employee',
    });

    const userId = await userRepository.save(user);

    const employeeRepository = getRepository(Employee);

    const employee = employeeRepository.create({
      surname,
      type,
      active: '1',
      user_id: userId.id,
    });

    const employee_id = await employeeRepository.save(employee);

    return {
      id: employee_id.id,
      email,
      username,
      surname,
      type: userId.type,
      type_employee: type,
      user_id: userId.id,
    };
  }
}

export default CreateEmployeeService;
