import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import Employee from '../models/Employee';
import { validationEmail, validationPassword } from '../utils/User/validations';

interface Request {
  email: string;
  username: string;
  password: string;
  name: string;
  type: 'common' | 'manager';
}

interface Response {
  id: string;
  email: string;
  username: string;
  name: string;
  type: 'common' | 'manager';
  user_id: string;
}

class CreateCustomerService {
  public async execute({
    email,
    username,
    password,
    name,
    type,
  }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({ email });

    const checkUsernameExists = await userRepository.findOne({ username });

    const retornoEmail = await validationEmail.validateAsync({ email });

    const retornoPassword = await validationPassword.validateAsync({
      password,
    });

    if (checkEmailExists) throw new Error('Email address already used');

    if (checkUsernameExists) throw new Error('Username already used');

    if (retornoEmail === false) {
      throw new Error('Invalid email');
    }

    if (retornoPassword === false) {
      throw new Error('Invalid password');
    }

    if (type !== 'common' && type !== 'manager') {
      throw new Error('There is no this Employee type');
    }

    const newPassword = await hash(password, 8);

    const user = userRepository.create({
      email,
      username,
      password: newPassword,
      active: '1',
    });

    const userId = await userRepository.save(user);

    const employeeRepository = getRepository(Employee);

    const employee = employeeRepository.create({
      name,
      type,
      active: '1',
      user_id: userId.id,
    });

    const employee_id = await employeeRepository.save(employee);

    return {
      id: employee_id.id,
      email,
      username,
      name,
      type,
      user_id: userId.id,
    };
  }
}

export default CreateCustomerService;
