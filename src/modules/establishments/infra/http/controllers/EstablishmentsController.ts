import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEstablishmentService from '@modules/establishments/services/CreateEstablishmentService';
import CreateEmployeeService from '@modules/users/services/CreateEmployeeService';

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

    const createEstablishmentService = container.resolve(
      CreateEstablishmentService,
    );

    await createEstablishmentService.execute({
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

    return response.json({
      email,
      establishment,
      username,
    });
  }
}
