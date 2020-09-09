import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateEstablishmentService from '../services/CreateEstablishment';
import User from '../models/User';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const establishmentsRouter = Router();

establishmentsRouter.get('/', ensureAuthenticated, async (request, response) => {
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
    .getMany();

  return response.json(establishments);
});

establishmentsRouter.post('/', async (request, response) => {
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
  } = request.body;

  const establishmentService = new CreateEstablishmentService();

  const establishmentt = await establishmentService.execute({
    email,
    username,
    password,
    name,
    establishment,
    street,
    neighborhood,
    number,
    uf,
    reference_point: reference_point === undefined ? '' : reference_point,
  });

  return response.json(establishmentt);
});

export default establishmentsRouter;
