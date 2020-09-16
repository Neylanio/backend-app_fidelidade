import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateEmployeeService from '../../services/CreateEmployee';
import User from '../../models/User';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const establishmentRouter = Router();
establishmentRouter.use(ensureAuthenticated);

// Establishment



// Employees
establishmentRouter.get('/employees', async (request, response) => {
  const userRepository = getRepository(User);

  const users = await userRepository
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.employee', 'employee')
    .select([
      'user.id',
      'user.email',
      'user.username',
      'user.active',
      'user.avatar',
      'user.created_at',
      'user.updated_at',
      'employee.id',
      'employee.name',
      'employee.type',
    ])
    .getMany();

  return response.json(users);
});

establishmentRouter.post('/employees', async (request, response) => {
  const { email, username, password, name, type } = request.body;

  const employeeService = new CreateEmployeeService();

  const employee = await employeeService.execute({
    email,
    username,
    password,
    name,
    type,
  });

  return response.json(employee);
});

// -- Update employee data


// Promotions



// Selos



export default establishmentRouter;
