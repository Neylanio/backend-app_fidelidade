import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateEstablishmentService from "@modules/establishments/services/CreateEstablishmentService";

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

    const createEstablishmentService = container.resolve(CreateEstablishmentService);

    const estab = await createEstablishmentService.execute({
      avatar: '',
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
    });

    return response.json(estab);

  }
}
