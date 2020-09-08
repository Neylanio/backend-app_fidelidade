import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Establishment from '../models/Establishment';
import Employee from '../models/Employee';
import User from '../models/User';
import { validationEmail, validationPassword } from '../utils/User/validations';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  username: string;
  password: string;
  name: string;
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
      name,
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

    const retornoEmail = await validationEmail.validateAsync({ email });

    const retornoPassword = await validationPassword.validateAsync({
      password,
    });

    if (checkEmailExists) {
      throw new AppError('Email address already registered', 401);
    }

    if (checkUsernameExists) throw new AppError('Username already used', 401);

    if (retornoEmail === false) {
      throw new AppError('Invalid email');
    }

    if (retornoPassword === false) {
      throw new AppError('Invalid password');
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
      name,
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
      active: '1',
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
