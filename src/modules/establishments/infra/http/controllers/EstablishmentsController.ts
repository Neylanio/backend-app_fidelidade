import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import CreateEmployeeService from '@modules/users/services/CreateEmployeeService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import CreateEstablishmentUserRepository from '@modules/establishments/services/CreateEstablishmentUserRepository';

export default class EstablishmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      email,
      username,
      password,
      surname,
      whatsapp,
      city,
      establishment,
      neighborhood,
      number,
      street,
      tel,
      uf,
      reference_point,
    } = request.body;

    const createEmployeeService = container.resolve(CreateEmployeeService);

    const employee = await createEmployeeService.execute({
      avatar: '',
      email,
      password,
      surname,
      type_employee: 'manager',
      username,
      whatsapp,
    });

    try {
      const createEstablishmentService = container.resolve(
        CreateEstablishmentService,
      );

      const estab = await createEstablishmentService.execute({
        establishment,
        city,
        neighborhood,
        number,
        street,
        tel,
        uf,
        reference_point,
        employee_id: employee.id,
      });

      const createEstablishmentUserService = container.resolve(
        CreateEstablishmentUserRepository,
      );

      await createEstablishmentUserService.execute({
        establishment_id: estab.id,
        user_id: employee.id,
      });

      return response.json({
        email,
        establishment,
        username,
      });
    } catch (error) {
      const deleteUserService = container.resolve(DeleteUserService);

      await deleteUserService.execute({ email });

      return response
        .status(401)
        .json({ status: 'error', message: error.message });
    }
  }
}
