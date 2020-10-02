import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateEmployeeService from '@modules/users/services/CreateEmployeeService';
import User from '@modules/users/infra/typeorm/entities/User';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const establishmentRouter = Router();
establishmentRouter.use(ensureAuthenticated);

// Establishment
establishmentRouter.get('/', async (request, response) => {
  const establishment = '';
  return response.json(establishment);
});

establishmentRouter.put('/', async (request, response) => {
  const establishment = '';
  return response.json(establishment);
});


// Employees --> preciso ajeitar
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
      'employee.surname',
      'employee.type',
    ])
    .getMany();

  return response.json(users);
});

establishmentRouter.put('/employees', async (request, response) => {

});

establishmentRouter.post('/employees', async (request, response) => {
  const { email, username, password, surname, type_employee, avatar, whatsapp } = request.body;

  const employeeService = new CreateEmployeeService();

  const employee = await employeeService.execute({
    email,
    username,
    password,
    surname,
    type_employee,
    avatar,
    whatsapp,
  });

  return response.json(employee);
});



// Listar customers
establishmentRouter.get('/customers', async (request, response) => {
  // Listar cards dos customers

});



// Listar, Cadastrar e Atualizar promocoes (manager)
establishmentRouter.get('/promotions', async (request, response) => {

});

establishmentRouter.post('/promotions', async (request, response) => {

});

establishmentRouter.put('/promotions', async (request, response) => {

});


// Adicionar stamps no customer
establishmentRouter.post('/stamps', async (request, response) => {

})



// Atualizar dados do Employee
establishmentRouter.get('/config', async (request, response) => {

});

establishmentRouter.put('/config', async (request, response) => {

});


// Listar logs de acesso
establishmentRouter.get('/logs', async (request, response) => {
  // somente se o usuario for manager
});

export default establishmentRouter;
