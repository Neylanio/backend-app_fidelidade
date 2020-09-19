import { Router, request } from 'express';
import ensureAuthenticated from '../../modules/users/infra/http/middlewares/ensureAuthenticated';
import { getRepository } from 'typeorm';
import User from '../../models/User';

const adminRouter = Router();
adminRouter.use(ensureAuthenticated);

// Listar establishments
adminRouter.get('/establishments', async (request, response) => {
  const employeeRepository = getRepository(User);

  const establishments = await employeeRepository
    .createQueryBuilder('user')
    .innerJoinAndSelect('user.employee', 'employee')
    .innerJoinAndSelect('employee.establishments', 'establishment')
    .select([
      'user.username',
      'user.active',
      'employee.name',
      'employee.active',
      'establishment.id',
      'establishment.name',
      'establishment.street',
      'establishment.neighborhood',
      'establishment.number',
      'establishment.uf',
      'establishment.reference_point',
      'establishment.active',
      'establishment.responsible_employee_id',
      'establishment.created_at',
      'establishment.updated_at',
    ])
    .where({ 'user.type': 'employee' })
    .getMany();

  return response.json(establishments);
});

// Ativar ou inativar establishment
adminRouter.patch('/establishments', async (request, response) => {
  return response.json({ message: true });
});


// Listar employees dos establishments
adminRouter.get('/establishments/employees', async (request, response) => {
  return response.json({ message: true });
});


// Listar promotions
adminRouter.get('/establishments/promotions', async (request, response) => {
  return response.json({ message: true });
});


// Listar customers
adminRouter.get('/establishments/customers', async (request, response) => {
  return response.json({ message: true });
});


// Listar logs de erros
adminRouter.get('/logs', async (request, response) => {

});

export default adminRouter;
