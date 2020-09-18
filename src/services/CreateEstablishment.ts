import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import * as Yup from 'yup';

import Establishment from '../models/Establishment';
import Employee from '../models/Employee';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  username: string;
  password: string;
  surname: string;
  establishment: string;
  street: string;
  neighborhood: string;
  number: string;
  uf: string;
  reference_point: string;
}

interface Response {
  email: string;
  username: string;
  establishment: string;
}

class CreateEstablishmentService {
  public async execute(request: Request): Promise<Response> {
    const {
      email,
      username,
      password,
      surname,
      establishment,
      street,
      neighborhood,
      number,
      uf,
      reference_point,
    } = request;

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

    if (checkEmailExists) {
      throw new AppError('Email já usado. Por favor faça o Logon!', 401);
    }

    if (checkUsernameExists) throw new AppError('Username não está disponível. Tente outro!', 401);

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      username,
      password: newPassword,
      active: '0',
      type: 'employee',
    });

    const userId = await userRepository.save(user);

    const employeeRepository = getRepository(Employee);

    const employee = employeeRepository.create({
      surname,
      type: 'manager',
      active: '1',
      user_id: userId.id,
    });

    const employee_id = await employeeRepository.save(employee);

    const establishmentRepository = getRepository(Establishment);

    const establishmentt = establishmentRepository.create({
      name: establishment,
      street,
      neighborhood,
      number,
      uf,
      reference_point,
      active: '0',
      responsible_employee_id: employee_id.id,
    });

    await establishmentRepository.save(establishmentt);

    return {
      email,
      username,
      establishment,
    };
  }
}

export default CreateEstablishmentService;
